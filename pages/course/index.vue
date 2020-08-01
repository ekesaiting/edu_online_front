<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">课程类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a title="全部" href="#" @click="selectAll" :class="{active: oneIndex===-1}">全部</a>
                </li>
                <li v-for="(oneLevelSubject,index) in oneLevelSubjectList" :key="index" :class="{active: oneIndex===index}">
                  <a :title="oneLevelSubject.title" href="#" @click="selectOneLevelSubject(oneLevelSubject.id,index)">{{oneLevelSubject.title}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="c-999 fsize14"></span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                  <li v-for="(twoLevelSubject,index) in twoLevelSubjectList" :key="index" :class="{active: twoIndex===index}" >
                    <a :title="twoLevelSubject.title" href="#" @click="selectTwoLevelSubject(twoLevelSubject.id,index)">{{twoLevelSubject.title}}</a>
                  </li>
              </ul>
            </dd>
          </dl>
          <div class="clear"></div>
        </section>
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>
          <section class="fl">
            <ol class="js-tap clearfix">
              <li :class="{'current bg-orange':searchParams.buyCountSort}">
                <a title="销量" href="javascript:void(0);" @click="selectBuyCount()">销量
                  <span :class="{hide:searchParams.buyCountSort===false}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':searchParams.gmtCreateSort}">
                <a title="最新" href="javascript:void(0);" @click="selectGmtCreate()">最新
                  <span :class="{hide:searchParams.gmtCreateSort===false}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':searchParams.priceSort}">
                <a title="价格" href="javascript:void(0);" @click="selectPrice()">价格&nbsp;
                  <span :class="{hide:searchParams.priceSort===false}">↓</span>
                </a>
              </li>
            </ol>
          </section>
        </div>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="data.total===0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article class="comm-course-list">
            <ul class="of" id="bna">
              <li v-for="course in data.items">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img :src="course.cover" class="img-responsive" :alt="course.title">
                    <div class="cc-mask">
                      <a :href="'/course/'+course.id" title="开始学习" class="comm-btn c-btn-1">开始学习</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a :href="'/course/'+course.id" :title="course.title" class="course-title fsize18 c-333">{{course.title}}</a>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span class="fr jgTag bg-green" v-if="Number(course.price)===0">
                      <i class="c-fff fsize12 f-fA">免费</i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">{{course.viewCount}}人学习</i>
                      <i class="c-999 f-fA">9634评论</i>
                    </span>
                  </section>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
        <!-- 公共分页 开始 -->
        <div>
          <div class="paging">
            <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
            <a
              :class="{undisable: !data.hasPrevious}"
              href="#"
              title="首页"
              @click.prevent="gotoPage(1)">首</a>
            <a
              :class="{undisable: !data.hasPrevious}"
              href="#"
              title="前一页"
              @click.prevent="gotoPage(data.current-1)">&lt;</a>
            <a
              v-for="page in data.pages"
              :key="page"
              :class="{current: data.current == page, undisable: data.current == page}"
              :title="'第'+page+'页'"
              href="#"
              @click.prevent="gotoPage(page)">{{ page }}</a>
            <a
              :class="{undisable: !data.hasNext}"
              href="#"
              title="后一页"
              @click.prevent="gotoPage(data.current+1)">&gt;</a>
            <a
              :class="{undisable: !data.hasNext}"
              href="#"
              title="末页"
              @click.prevent="gotoPage(data.pages)">末</a>
            <div class="clear"/>
          </div>
        </div>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>

<script>
  import courseApi from "../../api/course";

  export default {
    name: "index",
    data() {
      return {
        page:1,
        data:{},
        oneLevelSubjectList: [], // 一级分类列表
        twoLevelSubjectList: [], // 二级分类列表
        searchParams: {
          subjectId:null,
          subjectParentId:null,
          buyCountSort:false,
          gmtCreateSort:false,
          priceSort:false,
        }, // 查询表单对象
        oneIndex:-1,
        twoIndex:-1,
      }
    },
    created() {
      this.initCourse();
      this.initSubject();
    },
    methods:{
      initCourse(){
        courseApi.getCoursePage(1,8,this.searchParams).then(resp=>{
          this.data=resp.data;
        })
      },
      initSubject(){
        courseApi.getAllSubject().then(resp=>{
          this.oneLevelSubjectList=resp.data.items;
        })
      },
      gotoPage(page){
        courseApi.getCoursePage(page,8,this.searchParams).then(resp=>{
          this.data=resp.data;
        })
      },
      selectOneLevelSubject(id,index){
        this.twoIndex=-1;
        this.oneIndex=index;
        this.searchParams.subjectId=null;
        this.searchParams.subjectParentId=id;
        this.gotoPage(1);
        for (const oneLevelSubject of this.oneLevelSubjectList) {
          if (oneLevelSubject.id===id){
            this.twoLevelSubjectList=oneLevelSubject.children;
          }
        }
      },
      selectTwoLevelSubject(id,index){
        this.twoIndex=index;
        this.searchParams.subjectId=id;
        this.gotoPage(1);
      },
      selectBuyCount(){
        this.searchParams.buyCountSort=true;
        this.searchParams.gmtCreateSort=false;
        this.searchParams.priceSort=false;
        this.gotoPage(1);
      },
      selectGmtCreate(){
        this.searchParams.buyCountSort=false;
        this.searchParams.gmtCreateSort=true;
        this.searchParams.priceSort=false;
        this.gotoPage(1);
      },
      selectPrice(){
        this.searchParams.buyCountSort=false;
        this.searchParams.gmtCreateSort=false;
        this.searchParams.priceSort=true;
        this.gotoPage(1);
      },
      selectAll(){
        this.oneIndex=-1;
        this.twoLevelSubjectList=null;
        this.searchParams.subjectId=null;
        this.searchParams.subjectParentId=null;
        this.gotoPage(1);
      }
    }
  }
</script>

<style scoped>

  .active {
    background: #bdbdbd;
  }
  .hide {
    display: none;
  }
  .show {
    display: block;
  }
</style>
