<template>
  <div class="main-body">
    <header id="header">
        <h1>
            <NuxtLink to="/">
                <span>AquPEX</span>
            </NuxtLink>
        </h1>
        <input type="checkbox" id="right-menu_check">
        <label for="right-menu_check" class="right-menu_icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="36px" height="36px"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
        </label>
        <div class="right-menu_wrapper">
            <label for="right-menu_check" class="right-menu_label"></label>
            <div class="right-menu">
                <label for="right-menu_check" class="right-menu_button">close</label>
                <ul v-on:click="closeRightMenu">
                    <li><NuxtLink to="/test">test</NuxtLink></li>
                </ul>
                <ul v-on:click="closeRightMenu">
                </ul>
            </div>
        </div>
    </header>
    <nuxt />
    <footer>
        <div id="sitemap">
            <h2>サイトマップ</h2>
            <ul>
                <li><NuxtLink to="/test">test</NuxtLink></li>
            </ul>
            <p>当サイトは非公式・非公認のネタサイトです。公式への問い合わせ等はご遠慮ください。</p>
        </div>
        <a href="#header" class="topButton">↑</a>
    </footer>
  </div>
</template>

<style>
@media screen and (max-width:959px) {
}
@media screen and (min-width:960px) {
}
* {
    margin:0;padding:0;
}
body {
    background-color:#F9F9F9;
}
.main-body {
}
header {
    display:flex;
}
header h1 {
    height:100%;
}
header h1 a {
    display:block;
    height:100%;
    position:relative;
    vertical-align:middle;
}
header h1 img {
    display:inline-block;
    position:absolute;
}
header h1 span {
    display:inline-block;
    color:#2d2d2d;
    font-weight: 500;
}
.right-menu_wrapper {
    margin-left:auto;
}
.right-menu_wrapper ul {
    display:flex;
    flex-wrap:wrap;
    list-style:none;
    padding:0;
    align-items:center;
    justify-content:flex-end;
    text-align:center;
}
#right-menu_check {
    width:0px;
    height:0px;
    position:fixed;
    right:0;bottom:0;
    overflow:hidden;
    opacity:0;
}
@media screen and (max-width:959px) {
    header {
        height:50px;
        padding: 8px 16px;
    }
    .logo_pc {
        display:none;
    }
    header h1 a {
        line-height:50px;
    }
    header h1 img {
        height: 42px;
        top: calc((100% - 42px)/2);
    }
    header h1 span {
        margin-left:calc(42px + 8px);
        font-size:24px;
    }
    .right-menu_icon {
        width:50px;
        height:50px;
        margin-left:auto;
        display:flex;
        align-items:center;
        justify-content:center;
    }
    .right-menu_label {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.4);
        top: 0;
        left: 0;
        opacity:0;
        transition:opacity .4s;
    }
    #right-menu_check:checked~.right-menu_wrapper>.right-menu_label {
        opacity:1;
    }
    .right-menu_button {
        display:block;
        width:100%;
        padding: 4px 0;
        text-align:center;
    }
    .right-menu_wrapper {
        position:fixed;
        right:0;top:0;
        height:0%;
        width:100%;
        overflow:hidden;
        transition:height 0s 0.4s;
        z-index:10;
    }
    #right-menu_check:checked~.right-menu_wrapper {
        height:100%;
        transition:height 0s 0s;
    }
    .right-menu_wrapper ul {
        width:100%;
    }
    .right-menu_wrapper ul li {
        width:100%;    
    }
    .right-menu_wrapper a {
        padding: 8px 0;
    }
    .right-menu {
        position:absolute;
        right:0;top:0;
        background-color:#F9F9F9;
        height:100%;
        transition:transform .3s;
        transform: translate3d(100%, 0, 0px);
        max-width: 65%;
    }
    #right-menu_check:checked~.right-menu_wrapper>.right-menu {
        transform: translate3d(0, 0, 0px);
    }
    #menu_sitemap {
        display:none;
    }
    footer {
        margin-top: 24px;
        padding: 16px 8px;
    }
    footer p {
        font-size:0.8em;
    }
    footer ul li {
        height:4em;
    }
    footer ul li {
        width:25%;
    }
    footer ul li.longtype {
        width:50%;
    }
}
@media screen and (min-width:960px) {
    header {
        height:90px;
        padding: 16px 32px;
    }
    header h1 a {
        line-height:90px;
    }
    .logo_sp {
        display:none;
    }
    header h1 img {
        height: 60px;
        top: calc((100% - 60px)/2);
    }
    header h1 span {
        padding-left:calc(60px + 16px);
    }
    .right-menu_icon {
        display:none;
    }
    .right-menu_wrapper > div {
        height:100%;
    }
    .right-menu_wrapper ul {
        height:50%;
    }
    .right-menu_wrapper ul li {
        width:150px;    
    }
    .right-menu_label, .right-menu_button {
        display:none;
    }
    .sp-only {
        display:none;
    }
    footer {
        margin-top: 80px;
        padding: 20px;
    }
    footer ul li {
        height:80px;
    }
    footer ul li {
        width:20%;
    }
}
.right-menu_wrapper a {
    display:block;
    width:100%;
    height:100%;
    text-decoration:none;
    color:#3a3a3a;
    font-weight:400;
    transition: border .2s ease-out;
    border-bottom:solid 3px transparent;

}
.right-menu_wrapper a:hover {
    border-bottom:solid 3px lightpink;
}
footer {
    background-color:#707070;
    color:white;
    position:relative;
}
footer > div {
    max-width:1200px;
    margin:0 auto;
}
footer h2 {
    margin: 16px 0;
}
footer ul {
    list-style:none;
    display:flex;
    flex-wrap:wrap;
}
footer ul li a {
    text-decoration:none;
    color:white;
}
.topButton {
    width:60px;
    height:60px;
    text-align:center;
    line-height:60px;
    font-size:40px;
    text-decoration:none;
    color:white;
    position:absolute;
    top:0;right:0;
}
</style>

<script>
export default {
  head() {
      return {
            htmlAttrs: {
                lang: 'ja',
                prefix: 'og: http://ogp.me/ns#'
            },
            title: 'AquPEX Legends',
            meta: [
            ],
      }
  },
  data () {
    return {
    }
  },
  methods: {
      closeRightMenu(event) {
          const elmCheckbox = document.getElementById('right-menu_check');
          if(elmCheckbox) {
              elmCheckbox.checked = false;
          } else {
              console.log('err checkbox notfound');
          }
      }
  },
  computed: {
  },
  mounted() {
  }
}
</script>
