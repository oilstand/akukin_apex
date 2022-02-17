<template>
    <div class="main-area">
        <div class="head-box">
            <h1>RPの変化数から戦績を逆算するやつ</h1>
        </div>
        <div class="main-content">
            <NuxtLink to="/calcrp_s12s1">SEASON12</NuxtLink>
            <NuxtLink to="/calcrp_s11s2">SEASON11</NuxtLink>
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
        return {}
    },
    methods: {
    },
    computed: {
    },
    components: {},
    mounted() {
    },
    head() {
        return {
            title: 'RP逆算計算機',
            titleTemplate: 'RP逆算計算機',
            meta: [
                { hid: 'description', name: 'description', content: `現在のRPとRP変化値から戦績を逆算します` },
                { hid: 'keywords', name: 'keywords', content: 'APEX,RP逆算' },
                { hid: 'og:site_name', property: 'og:site_name', content: 'RP逆算計算機' },
                { hid: 'og:card', property: 'og:type', content: 'summary_large_image' },
                { hid: 'og:image', property: 'og:image', content: 'https://apex.akukin.jp/icon.png' },
                { hid: 'og:url', property: 'og:url', content: 'https://apex.akukin.jp/calcrp' },
                { hid: 'og:title', property: 'og:title', content: `RP逆算計算機` },
                { hid: 'og:description', property: 'og:description', content: '現在のRPとRP変化値から戦績を逆算します' },
                { name: 'twitter:card', content: 'summary_large_image' }
            ],
            script: [
            ]
        }
    },
}
</script>
