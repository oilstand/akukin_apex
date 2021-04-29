<template>
    <div id="canvTarget" style="width:100%;height:100%;">

    </div>
</template>
<style>
#canvTarget canvas {
    width:100%;
    height:100%;
}
</style>

<script>

import * as THREE from 'three';
import { OrbitControls } from './OrbitControls.js';

export default {
    data() {
        return {
            container: false,
            camera: false,
            clothGeometry: false,
            cloth: false,
            scene: false,
            object: false,
            restDistance: 29,
            xSegs: 10,
            ySegs: 15,
            simulate: false,
            animate: false,
            render: false
        }
    },
    methods: {
        clothFunction( u, v, target ) {
            const x = ( u - 0.5 ) * this.restDistance * this.xSegs;
            const y = ( v + 0.5 ) * this.restDistance * this.ySegs;
            const z = 0;
            target.set( x, y, z );
        },
        init() {

            this.container = document.getElementById( 'canvTarget' );
            //document.body.appendChild( this.container );

            // scene

            this.scene = new THREE.Scene();
    //@             this.scene.background = new THREE.Color( 0xcce0ff );
    //@				this.scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 );

            // camera

            this.camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
            this.camera.position.set( 1000, 50, 1500 );

            // lights

            this.scene.add( new THREE.AmbientLight( 0xff3300 ) );

            const light = new THREE.DirectionalLight( 0xdfebff, 1 );
            light.position.set( 50, 200, 100 );
            light.position.multiplyScalar( 1.3 );

            light.castShadow = true;

            light.shadow.mapSize.width = 1024;
            light.shadow.mapSize.height = 1024;

            const d = 300;

            light.shadow.camera.left = - d;
            light.shadow.camera.right = d;
            light.shadow.camera.top = d;
            light.shadow.camera.bottom = - d;

            light.shadow.camera.far = 1000;

            this.scene.add( light );

            // cloth material

            const loader = new THREE.TextureLoader();
            const clothTexture = loader.load( 'circuit_pattern4.png' );
            clothTexture.anisotropy = 16;

//MeshLambertMaterial MeshBasicMaterial MeshNormalMaterial
            const clothMaterial = new THREE.MeshLambertMaterial( {
                map: clothTexture,
                side: THREE.DoubleSide,
                alphaTest: 0.5
            } );

            // cloth geometry

            this.clothGeometry = new THREE.ParametricBufferGeometry( this.clothFunction, this.cloth.w, this.cloth.h );

            // cloth mesh

            this.object = new THREE.Mesh( this.clothGeometry, clothMaterial );
            this.object.position.set( 0, 0, 0 );
            this.object.castShadow = true;
            this.scene.add( this.object );

            this.object.customDepthMaterial = new THREE.MeshDepthMaterial( {
                depthPacking: THREE.RGBADepthPacking,
                map: clothTexture,
                alphaTest: 0.5
            } );

            // renderer

            this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
            this.renderer.setPixelRatio( window.devicePixelRatio );
//@            this.renderer.setSize( 1920, 1080, false );
            this.renderer.setSize( 960, 540, false );
            console.log(this.container.clientWidth, this.container.clientHeight);

            this.renderer.setClearColor( 0xffffff, 0 );///@

            this.container.appendChild( this.renderer.domElement );

            this.renderer.outputEncoding = THREE.sRGBEncoding;

            this.renderer.shadowMap.enabled = true;

            // controls 
            const controls = new OrbitControls( this.camera, this.renderer.domElement );
            controls.maxPolarAngle = Math.PI * 0.5;
            controls.minDistance = 1000;
            controls.maxDistance = 5000;

            window.addEventListener( 'resize', this.onWindowResize );

            if ( typeof TESTING !== 'undefined' ) {
                for ( let i = 0; i < 50; i ++ ) {
                    this.simulate( 500 - 10 * i );
                }
            }

        },
        onWindowResize() {
            this.camera.aspect = 1920 / 1080;
            this.camera.updateProjectionMatrix();

//@            this.renderer.setSize( 1920, 1080, false );
            this.renderer.setSize( 960, 540, false );
        }
    },
    props: [],
    mounted() {
/////////////////////
        const params = {
            enableWind: true,
            showBall: false,
            togglePins: togglePins
        };

        const DAMPING = 0.03;
        const DRAG = 1 - DAMPING;
        const MASS = 0.1;
        //const restDistance = 25;

        //const xSegs = 10;
        //const ySegs = 15;

        this.cloth = new Cloth( this.xSegs, this.ySegs, this.clothFunction, this.restDistance );

        const GRAVITY = 981 * 1.4;
        const gravity = new THREE.Vector3( 0, - GRAVITY, 0 ).multiplyScalar( MASS );


        const TIMESTEP = 18 / 1000;
        const TIMESTEP_SQ = TIMESTEP * TIMESTEP;

        let pins = [];

        const windForce = new THREE.Vector3( 0, 0, 0 );

        const tmpForce = new THREE.Vector3();



        function Particle( x, y, z, mass, clothFunction ) {

            this.clothFunction = clothFunction;
            this.position = new THREE.Vector3();
            this.previous = new THREE.Vector3();
            this.original = new THREE.Vector3();
            this.a = new THREE.Vector3( 0, 0, 0 ); // acceleration
            this.mass = mass;
            this.invMass = 1 / mass;
            this.tmp = new THREE.Vector3();
            this.tmp2 = new THREE.Vector3();

            // init

            this.clothFunction( x, y, this.position ); // position
            this.clothFunction( x, y, this.previous ); // previous
            this.clothFunction( x, y, this.original );

        }

        // Force -> Acceleration

        Particle.prototype.addForce = function ( force ) {

            this.a.add(
                this.tmp2.copy( force ).multiplyScalar( this.invMass )
            );

        };


        // Performs Verlet integration

        Particle.prototype.integrate = function ( timesq ) {

            const newPos = this.tmp.subVectors( this.position, this.previous );
            newPos.multiplyScalar( DRAG ).add( this.position );
            newPos.add( this.a.multiplyScalar( timesq ) );

            this.tmp = this.previous;
            this.previous = this.position;
            this.position = newPos;

            this.a.set( 0, 0, 0 );

        };


        const diff = new THREE.Vector3();

        function satisfyConstraints( p1, p2, distance ) {

            diff.subVectors( p2.position, p1.position );
            const currentDist = diff.length();
            if ( currentDist === 0 ) return; // prevents division by 0
            const correction = diff.multiplyScalar( 1 - distance / currentDist );
            const correctionHalf = correction.multiplyScalar( 0.5 );
            p1.position.add( correctionHalf );
            p2.position.sub( correctionHalf );

        }


        function Cloth( w, h, clothFunction, restDistance ) {

            w = w || 10;
            h = h || 10;
            this.w = w;
            this.h = h;

            const particles = [];
            const constraints = [];

            // Create particles
            for ( let v = 0; v <= h; v ++ ) {

                for ( let u = 0; u <= w; u ++ ) {

                    particles.push(
                        new Particle( u / w, v / h, 0, MASS, clothFunction )
                    );

                }

            }

            // Structural

            for ( let v = 0; v < h; v ++ ) {

                for ( let u = 0; u < w; u ++ ) {

                    constraints.push( [
                        particles[ index( u, v ) ],
                        particles[ index( u, v + 1 ) ],
                        restDistance
                    ] );

                    constraints.push( [
                        particles[ index( u, v ) ],
                        particles[ index( u + 1, v ) ],
                        restDistance
                    ] );

                }

            }

            for ( let u = w, v = 0; v < h; v ++ ) {

                constraints.push( [
                    particles[ index( u, v ) ],
                    particles[ index( u, v + 1 ) ],
                    restDistance

                ] );

            }

            for ( let v = h, u = 0; u < w; u ++ ) {

                constraints.push( [
                    particles[ index( u, v ) ],
                    particles[ index( u + 1, v ) ],
                    restDistance
                ] );

            }

            this.particles = particles;
            this.constraints = constraints;

            function index( u, v ) {

                return u + v * ( w + 1 );

            }

            this.index = index;

        }

        this.simulate = ( now ) => {

            const windStrength = 7;//Math.cos( now / 7000 ) * 20 + 40;

            let a = Math.abs(Math.sin( now / 2000 )), b = Math.abs(Math.cos( now / 3000 )), c = -Math.abs(Math.sin( now / 1000 ));
            //@console.log(windStrength, a, b, c);
            windForce.set( a, b, c );
            windForce.normalize();
            windForce.multiplyScalar( windStrength );

            // Aerodynamics forces

            const particles = this.cloth.particles;

            if ( params.enableWind ) {

                let indx;
                const normal = new THREE.Vector3();
                const indices = this.clothGeometry.index;
                const normals = this.clothGeometry.attributes.normal;

                for ( let i = 0, il = indices.count; i < il; i += 3 ) {

                    for ( let j = 0; j < 3; j ++ ) {

                        indx = indices.getX( i + j );
                        normal.fromBufferAttribute( normals, indx );
                        tmpForce.copy( normal ).normalize().multiplyScalar( normal.dot( windForce ) );
                        particles[ indx ].addForce( tmpForce );

                    }

                }

            }

            for ( let i = 0, il = particles.length; i < il; i ++ ) {

                const particle = particles[ i ];
                particle.addForce( gravity );

                particle.integrate( TIMESTEP_SQ );

            }

            // Start Constraints

            const constraints = this.cloth.constraints;
            const il = constraints.length;

            for ( let i = 0; i < il; i ++ ) {

                const constraint = constraints[ i ];
                satisfyConstraints( constraint[ 0 ], constraint[ 1 ], constraint[ 2 ] );

            }

            // Floor Constraints

            /*for ( let i = 0, il = particles.length; i < il; i ++ ) {

                const particle = particles[ i ];
                const pos = particle.position;
                if ( pos.y < - 250 ) {

                    pos.y = - 250;

                }

            }*/

            // Pin Constraints

            for ( let i = 0, il = pins.length; i < il; i ++ ) {

                const xy = pins[ i ];
                const p = particles[ xy ];
                p.position.copy( p.original );
                p.previous.copy( p.original );

            }


        }

        /* testing cloth simulation */

        const pinsFormation = [];
        pins = [ 6 ];

        pinsFormation.push( pins );

        pins = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
        pinsFormation.push( pins );

        pins = [ 0 ];
        pinsFormation.push( pins );

        pins = []; // cut the rope ;)
        pinsFormation.push( pins );

        pins = [ 0, this.cloth.w ]; // classic 2 pins
        pinsFormation.push( pins );

        pins = pinsFormation[ 1 ];

        function togglePins() {

            pins = pinsFormation[ ~ ~ ( Math.random() * pinsFormation.length ) ];

        }

        this.init();



        //


        //


        this.render = () => {

            const p = this.cloth.particles;

            for ( let i = 0, il = p.length; i < il; i ++ ) {

                const v = p[ i ].position;

                this.clothGeometry.attributes.position.setXYZ( i, v.x, v.y, v.z );

            }

            this.clothGeometry.attributes.position.needsUpdate = true;

            this.clothGeometry.computeVertexNormals();

            this.renderer.render( this.scene, this.camera );

        }
        this.animate = ( now ) => {

            requestAnimationFrame( this.animate );
            this.simulate( now );
            this.render();
        }
        this.animate( 0 );

/////////////////////
        this.onWindowResize();
    }
}
</script>
