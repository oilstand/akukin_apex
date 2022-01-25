<template>
    <div id="page_container" :style="`aspect-ratio:16/9;font-size:${fontSize}px;background:gray;`">
        <video src="https://storage.googleapis.com/minatoaquajp.appspot.com/apex8_2el.mp4" loop autoplay muted playsinline ></video>
        <div style="width:100vw;height:100vh;"></div>

        <cTest class="canvas_box"></cTest>
        <img src="apex_cl_layer_11.png?04272">
        <NuxtLink to="/home" class="next-button" :style="`transform:translate(-50%,-50%) scale(${scale});`">
            <svg style="width: 1.5em;height: 1.5em;align-items: bottom;vertical-align: middle;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 32"><defs><style>.a{fill:#fff;}.b{fill:#ff8323;}</style></defs><path class="a" d="M30,22,20,19V4L16,1V0h7l7,5Z"/><path class="b" d="M0,5,7,0h7V1L10,4V19L0,22Z"/><path class="a" d="M13,5h4V18H13Z"/><path class="a" d="M0,24l15-4,15,4v8H0Z"/></svg>
            次に進む
        </NuxtLink>
        <NuxtLink to="#" class="dc-button" :style="`transform:scale(${scale});`">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 90" style="height:1.2em;vertical-align: middle;margin-right: 5px;"><defs><style>.a{fill:#f2f2f2;}</style></defs><polygon class="a" points="107.06 56.39 124.56 56.39 115.81 29.52 107.06 56.39"/><path class="a" d="M194.12,53.58a12.44,12.44,0,0,0-7.43-2.19H168.31V70.45h18.81a12.44,12.44,0,0,0,7.44-2.18q3.06-2.19,3.06-7.19C197.62,57.75,196.46,55.25,194.12,53.58Z"/><path class="a" d="M193.69,38.27a6.46,6.46,0,0,0,2.62-5.63A6.45,6.45,0,0,0,193.69,27a13.24,13.24,0,0,0-7.88-2.5h-17.5V40.77h17.5A13.24,13.24,0,0,0,193.69,38.27Z"/><path class="a" d="M231.67,0H8.33A8.33,8.33,0,0,0,0,8.33V81.67A8.33,8.33,0,0,0,8.33,90H231.67A8.33,8.33,0,0,0,240,81.67V8.33A8.33,8.33,0,0,0,231.67,0ZM79.5,25.77H58.94V79.83h-14V25.77h-21V15.45H79.5Zm52.06,54.06-3.94-13.75H104l-3.94,13.75H85.19l22.75-64.38h15.75L146,79.83Zm80.5-15a15.1,15.1,0,0,1-6.56,10.62q-6.57,4.69-17.5,4.69H155.19v-65H188q9.62,0,15.75,4.38A14.63,14.63,0,0,1,210.31,32q0,6.56-7,11.56a24.21,24.21,0,0,1-4.81,2.5,19.42,19.42,0,0,1,10.94,7.19Q212.94,58,212.06,64.83Z"/></svg>
            データセンター：ONION 44.5ms(0%PL)
        </NuxtLink>
        <pre class="copyright" :style="`transform:scale(${scale});`">Credits:
MMD Model Minato Aqua
Copyright © 2019 Cover Corp</pre>
        <div class="fadeHide loadingmask" style="position:absolute;width:100%;height:100%;background-color:#181818;animation-delay:3.3s;overflow:hidden;">
            <div class="load_bar" style="background-color: #2f9901;position: absolute;left: 11%;top: 91%;"></div>
            <img src="loading_ui_tone.png" style="position:absolute;width:100%;height:100%;">
        </div>
    </div>
</template>
<style scoped>
@keyframes loading {
    0% {
        width:calc(3 / 1920 * 100%);
    }
    100% {
        width:calc(320 / 1920 * 100%);
    }
}
@keyframes fadeHide {
    0% {
        opacity:1;
    }
    99% {
        opacity:0;
        width:100%;
    }
    100% {
        width:0%;
    }
}
.load_bar {
    animation-name: loading;
    animation-duration: 3s;
    animation-fill-mode:forwards;
    height:calc(30 / 1080 * 100%);
}
.fadeHide {
    opacity:1;

    animation-name: fadeHide;
    animation-duration: 0.5s;
    animation-fill-mode:forwards;
}
.next-button {
    display:block;
    text-decoration:none;

    position:absolute;
    left:50%;

    border: solid 1px #eaeaea;
    background-color: rgba(0,0,0,.5);
    width:250px;
    height: 3.5em;
    text-align: center;
    color: white;
    line-height: 3.5em;
    font-size: 21px;
    top: 64%;
    cursor:pointer;
}
.dc-button {
    transform-origin: bottom left;
    text-decoration:none;
    display:block;

    position:absolute;
    left:calc(150 / 1920 * 100%);
    width: 500px;
    text-align: center;
    color: #fdfdfd;
    font-size: 21px;
    bottom: calc(10 / 1080 * 100%);
    background-color: rgba(0,0,0,.2);
}
.copyright {
    transform-origin: bottom right;
    position: absolute;
    right: 0;
    bottom: 0;
    display: block;
    color: white;
    font-size: 2em;
    padding: 10px;
    font-weight:bold;
}
.dc-button > span {

}
.next-button:hover
{
    border: solid 2px orange;
}
#page_container {
    overflow:hidden;
    position:relative;
}
#page_container > video,
#page_container > iframe,
.canvTarget,
.loadingmask,
.canvas_box,
#page_container > img {
    width:100%;
    height:100%;
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
}
</style>
<script>

//import THREE from 'three';
//import { OrbitControls } from 'OrbitControls.js';
import cTest from '~/components/Test.vue'

export default {
    data () {
        return {
            scale: 1,
            fontSize: 16,
            width: 100,
            height: 100,
            elmParent: false,
            aspect: (1920 / 1080)
        }
    },
    methods: {
        onResize(e) {
            if(this.elmParent) {
                if(
                    (this.elmParent.clientWidth / this.elmParent.clientHeight) > this.aspect
                ) {
                    // 幅が大きい
                    this.height = this.elmParent.clientHeight;
                    this.width = this.elmParent.clientHeight * this.aspect;
                } else {
                    // 高さが大きい
                    this.height = this.elmParent.clientWidth * ( 1 / this.aspect );
                    this.width = this.elmParent.clientWidth;
                }
                this.scale = this.width / 1920;
                this.fontSize = 16 * this.scale;
            }
        }
    },
    computed: {
    },
    components: {
        cTest
    },
    mounted() {
        this.elmParent = document.getElementById('page_container').parentNode;
        window.addEventListener( 'resize', this.onResize, false );
        this.onResize();
    },
    head() {
        return {
            title: '',
            titleTemplate: 'AquPEX Legends',
            meta: [
                { hid: 'og:card', property: 'og:type', content: 'summary_large_image' },
                { hid: 'og:image', property: 'og:image', content: 'https://apex.akukin.jp/ogp_top.png' },
            ],            
            script: [
            ]
        }
    },
}
</script>
