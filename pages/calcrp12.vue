<template>
    <div class="main-area">
        <div class="head-box">
            <h1>RPの変化数から戦績を逆算するやつ:SEASON12</h1>
        </div>
        <div class="main-content">
            <NuxtLink to="/calcrp">SEASON11</NuxtLink>
            <h3>ランクマッチ参加費</h3>
            <table>
                <tr><th>Bronse</th><th>Silver</th><th>Gold</th><th>Platinum</th><th>Diamond</th><th>Master/Predator</th></tr>
                <tr><td>0</td><td>12</td><td>24</td><td>36</td><td>48</td><td>60</td></tr>
            </table>

            <h3>順位／KA加算RP</h3>
            <table>
                <tr><th></th><th>#1</th><th>#2</th><th>#3</th><th>#4</th><th>#5</th><th>#6</th><th>#7-8</th><th>#9-10</th><th>#11-13</th><th>#14+</th></tr>
                <tr><th>順位RP</th><td>125</td><td>95</td><td>70</td><td>55</td><td>45</td><td>30</td><td>20</td><td>10</td><td>5</td><td>0</td></tr>
                <tr><th>加算RP/KA</th><td>15</td><td>11</td><td>8</td><td>5</td><td>5</td><td>1</td><td>1</td><td>1</td><td>0</td><td>0</td></tr>
            </table>

            <h3>KA付与RP</h3>
            <table>
                <tr><th>ランク差</th><th>-3</th><th>-2</th><th>-1</th><th>0</th><th>+1</th><th>+2</th><th>+3</th></tr>
                <tr><th>RP</th><td>3</td><td>5</td><td>8</td><td>10</td><td>12</td><td>15</td><td>20</td></tr>
            </table>
            <p>※KA付与RP+KA加算RPの合計値は最大125RPまで</p>

            <p>ランクを選択</p>
            <select id="rank">
                <option value="bronse">Bronse</option>
                <option value="silver">Silver</option>
                <option value="gold">Gold</option>
                <option value="platinum">Platinum</option>
                <option value="diamond">Diamond</option>
                <option value="master">Master/Predator</option>
            </select>
            <p>変化RP</p>
            <input type="number" id="rp">

            <button v-on:click="lookupResult">検索</button>

            <p id="msg-area"></p>

            <table class="resultTable">
                <tr><th>順位</th><th>キル／アシスト</th></tr>
                <tr v-for="(recode, index) in lookupResults" :key="index">
                    <td>{{ recode.rank }}</td>
                    <td>
                        <span v-for="(dat, index2) in recode.ka" :key="'ka_'+index+'_'+index2" :class="dat.class">{{dat.num}} </span>
                    </td>
                </tr>
            </table>

            <p>オレンジ：KAランク差平均が1未満</p>
            <p>黒：KAランク差平均が1以上、2以下</p>
            <p>灰色：KAランク差平均が2越え</p>
        </div>
        
    </div>
</template>

<style scoped>
.head-box {
    padding: 16px 32px 10px;
    border-bottom: solid 2px gray;
    background-color:lightgray;
}
.main-area {
    width:100%;height:100%;
    background-color:#efefef;
}
.main-content {
    padding:16px 32px;
}
.msg-area {
    font-weight:bold;

}
table {
    margin:16px;
}
table,tr,td,th {
    border:solid 1px darkgray;
}
td,th {
    padding: 0 16px;
    text-align:center;
}
.disp_1 {
        
}
.disp_2 {
    color:orange;
    font-weight:bold;
}
.disp_3 {
    color:gray;
}
.disp_4 {
    font-weight:bold;    
}
.resultTable td {
    text-align:left;
}
</style>

<script>

export default {
    data () {
        return {
            rankTable: {
                bronse: {
                    cost: 0,
                    kaTable: [0,10,12,15,20]
                },
                silver: {
                    cost: 12,
                    kaTable: [0,8,10,12,15,20]
                },
                gold: {
                    cost: 24,
                    kaTable: [0,5,8,10,12,15,20]
                },
                platinum: {
                    cost: 36,
                    kaTable: [0,3,5,8,10,12,15]
                },
                diamond: {
                    cost: 48,
                    kaTable: [0,3,5,8,10,12]
                },
                master: {
                    cost: 60,
                    kaTable: [0,3,5,8,10]
                },
            },
            lookupTable: {

            },
            lookupResults: []
        }
    },
    methods: {
        gotoTop() {
            this.$router.push('/');
        },
        getElm(id) {
            return document.getElementById(id)
        },
        makeTblMain(rank) {
            if(!this.rankTable[rank])return;

            let pattern = this.rankTable[rank].kaTable;
            let cost = this.rankTable[rank].cost;

            let result = this.makeTblStep1(pattern,20)
            result = this.makeTblStep2(result,cost)

            return result;
            /*for(let key of Object.keys(result)) {
                console.log(`%cRP:${key- cost}(${key})`,'color:red;font-size:1.2em;')
                for(let key2 of Object.keys(result[key])) {
                    let msg = `${key2} KA:`;
                    let style = []
                    for(let key3 of Object.keys(result[key][key2])) {
                        let thin = Number(key3) >= 10 ? true : false;
                    
                        if(result[key][key2][key3] == 2) {
                            msg += ' %c'+key3
                            if(!thin)style.push('color:orange;font-weight:bold;')
                            else style.push('color:orange;font-weight:lighter;')
                        } else if(result[key][key2][key3] == 3) {
                            msg += ' %c'+key3
                            if(!thin)style.push('color:gray;')
                            else style.push('color:gray;font-weight:lighter;')
                        } else {
                            msg += " %c"+key3
                            if(!thin)style.push('font-weight:bold;')
                            else style.push('font-weight:lighter;')
                        }
                    }
                    console.log(msg, ...style);
                }
            }*/
        },
        makeTblStep1(pattern, num) {
            if(num == 0) return {0:{0:1}};

            let numbers = this.makeTblStep1(pattern, num - 1);
            let res = {}
            for(let key of Object.keys(numbers)) {
                
                for(let i = 0; i < pattern.length; i++) {
                    let newidx = (Number(key) + Number(pattern[i]))
                    if(newidx > 125)newidx = 125;
                
                    if(!res[newidx])res[newidx] = {}
                    for(let key2 of Object.keys(numbers[key])) {
                        let step = i == 0 ? 0 + Number(key2) : 1 + Number(key2);
                        res[newidx][step] = 1;
                    }
                }
            }
            
            return res;
        },
        makeTblStep2(numbers,cost) {
            const rankRp = [
                {rank:125,add:15,name:'#1'},
                {rank:95,add:11,name:'#2'},
                {rank:70,add:8,name:'#3'},
                {rank:55,add:5,name:'#4'},
                {rank:45,add:5,name:'#5'},
                {rank:30,add:1,name:'#6'},
                {rank:20,add:1,name:'#7-8'},
                {rank:10,add:1,name:'#9-10'},
                {rank:5,add:0,name:'#11-13'},
                {rank:0,add:0,name:'#14+'},
            ]

            let res = {}
            for(let key of Object.keys(numbers)) {
                for(let key2 of Object.keys(numbers[key])) {
                
                    for(let i = 0; i < rankRp.length; i++) {
                        let newidx = (Number(key) + Number(key2) * rankRp[i].add)
                        if(newidx > 125)newidx = 125;
                        newidx += rankRp[i].rank;
                        newidx -= cost;
                        
                        if(!res[newidx])res[newidx] = {}
                        if(!res[newidx][rankRp[i].name])res[newidx][rankRp[i].name] = {}
                        
                        if(!res[newidx][rankRp[i].name][key2]) {
                            res[newidx][rankRp[i].name][key2] = 1
                        }
                        
                        if( Number(key2) != 0
                            && res[newidx][rankRp[i].name][key2] == 1
                            && Number(key2) && Math.abs(Number(key) / Number(key2) - 10) > 5 ) {
                            res[newidx][rankRp[i].name][key2] = 3
                        }
                        if( Number(key2) != 0
                            && res[newidx][rankRp[i].name][key2] == 1
                            && Number(key2) && Math.abs(Number(key) / Number(key2) - 10) <= 5 && Math.abs(Number(key) / Number(key2) - 10) >= 2 ) {
                            res[newidx][rankRp[i].name][key2] = 4
                        }
                        if( (Number(key2) == 0 && res[newidx][rankRp[i].name][key2] == 1)
                            || ( Number(key2) != 0
                                && res[newidx][rankRp[i].name][key2] == 1
                                && Math.abs(Number(key) / Number(key2) - 10) < 2) ) {
                            res[newidx][rankRp[i].name][key2] = 2
                        }
                    }
                }

            }
            
            return res;
        },
        lookupResult() {
            let elmRank = this.getElm('rank')
            let elmRp = this.getElm('rp')
            let elmMsg = this.getElm('msg-area')

            elmMsg.textContent = ""

            if(!elmRp.value) {
                elmMsg.textContent = "RPを入力してください"
                return;
            }
            //console.log(elmRank.value,elmRp.value)
            if(!this.lookupTable[elmRank.value]) {
                this.lookupTable[elmRank.value] = this.makeTblMain(elmRank.value)
            }
            if(this.lookupTable[elmRank.value]) {
                if(this.lookupTable[elmRank.value][Number(elmRp.value)]) {
                    //console.log(this.lookupTable[elmRank.value][Number(elmRp.value)])

                    if(this.lookupResults.length) {
                        this.lookupResults.splice(0, this.lookupResults.length)
                    }
                    
                    for(let rank of Object.keys(this.lookupTable[elmRank.value][Number(elmRp.value)])) {
                        let kadisp = [];
                        for(let ka of Object.keys(this.lookupTable[elmRank.value][Number(elmRp.value)][rank])) {
                            kadisp.push({
                                num:ka,
                                class:'disp_'+this.lookupTable[elmRank.value][Number(elmRp.value)][rank][ka]
                            })
                        }

                        this.lookupResults.push({
                            rank:rank,
                            ka:kadisp
                        })
                    }
                    //console.log(this.lookupResults)
                }
            }
        },
        getRank(rp) {
            if(rp < 1200) {
                return 'bronse'
            } else if(rp < 2800) {
                return 'silver'
            } else if(rp < 4800) {
                return 'gold'
            } else if(rp < 7200) {
                return 'platinum'
            } else if(rp < 10000) {
                return 'diamond'
            } else {
                return 'master'
            }
        }
    },
    computed: {
        rank() {
            let no = this.getRankNo(this.rp);
            switch(Math.floor(no / 10)) {
                case 0: return 'bronse';
                case 1: return 'silver';
                case 2: return 'gold';
                case 3: return 'platinum';
                case 4: return 'diamond';
                case 5: return 'master';
                default: return '';
            }
        },
    },
    components: {},
    mounted() {
        console.log(this.$route.query.rp,this.$route.query.diff)
        if(this.$route.query.rp != undefined && this.$route.query.diff != undefined) {
            let elmRank = this.getElm('rank')
            let elmRp = this.getElm('rp')
            elmRp.value = Number(this.$route.query.diff)
            let preRank = this.getRank(Number(this.$route.query.rp) - Number(this.$route.query.diff))
            console.log(preRank)
            elmRank.value = preRank;
            this.lookupResult()
        }
    },
    head() {
        return {
            title: 'RP逆算計算機',
            titleTemplate: 'RP逆算計算機',
            meta: [
                { hid: 'description', name: 'description', content: `現在のRPとRP変化値から戦績を逆算します` },
                { hid: 'keywords', name: 'keywords', content: 'APEX,RP逆算' },
                { hid: 'og:site_name', property: 'og:site_name', content: 'RP逆算計算機:SEASON12' },
                { hid: 'og:card', property: 'og:type', content: 'summary_large_image' },
                { hid: 'og:image', property: 'og:image', content: 'https://apex.akukin.jp/icon.png' },
                { hid: 'og:url', property: 'og:url', content: 'https://apex.akukin.jp/calcrp' },
                { hid: 'og:title', property: 'og:title', content: `RP逆算計算機:SEASON12` },
                { hid: 'og:description', property: 'og:description', content: '現在のRPとRP変化値から戦績を逆算します' },
                { name: 'twitter:card', content: 'summary_large_image' }
            ],
            script: [
            ]
        }
    },
}
</script>
