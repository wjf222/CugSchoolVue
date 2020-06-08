import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/sign',
    name: 'sign',
    meta: {
      title: 'sign - 注册',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home'),
        children: [
          {
            path: '/index',
            name: 'home',
            meta: {
              hideInMenu: true,
              title: '首页',
              notCache: true,
              icon: 'md-home'
            },
            component: () => import('@/view/single-page/home/index.vue'),
          },
          {
            path: '/question',
            name: 'question',
            meta: {
              hideInMenu: true,
              title: '问题',
              notCache: true,
              icon: 'md-home'
            },
            component: () => import('@/view/single-page/home/questionList.vue'),
          },],
      }
    ]
  },
  {
    path: '',
    name: 'doc',
    meta: {
      hideInMenu: true,
      title: '文档',
      href: 'https://lison16.github.io/iview-admin-doc/#/',
      icon: 'ios-book'
    }
  },
  {
    path: '/search',
    name: 'search',
    component: Main,
    meta: {
      hideInBread: true,
      // hideInMenu: true
    },
    children: [
      {
        path: '/search_page',
        name: '搜索',
        meta: {
          icon: 'ios-search',
          title: '搜索'
        },
        component: () => import('@/view/search/search.vue')
      },
      {
        path: '/search_ans/:searchText',
        name: '搜索结果',
        meta: {
          hideInBread: true,
          hideInMenu: true,
          icon: 'ios-bug',
          title: '搜索结果'
        },
        component: () => import('@/view/search/search-ans.vue')
      },
    ]
  },
  {
    path: '/message',
    name: 'message',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'message_page',
        name: 'message_page',
        meta: {
          icon: 'md-notifications',
          title: '消息中心'
        },
        component: () => import('@/view/single-page/message/index.vue')
      }
    ]
  },
  {
    path: '/article',
    name: 'article',
    meta: {
      hideInBread: true,
    },
    component: Main,
    children: [
      {
        path: 'article_page',
        name: '发布文章',
        meta: {
          icon: 'ios-book',
          title: '发布文章'
        },
        component: () => import('@/view/article/article.vue')
      }
    ]
  },
  {
    path: '/comment',
    name: 'comment',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'comment_page',
        name: '评论',
        meta: {
          icon: 'ios-chatboxes',
          title: '评论'
        },
        component: () => import('@/view/comment/comment.vue')
      }
    ]
  },
  {
    path: '/center',
    name: 'center',
    meta: {
      hideInBread: true,
      // hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'center_page',
        name: '个人中心',
        meta: {
          icon: 'ios-person',
          title: '个人中心'
        },
        component: () => import('@/view/PersonMes/user-center.vue')
      },
      {
        path: 'view/:id',
            name: '文章',
            meta: {
              hideInBread: true,
              hideInMenu: true,
              icon: 'ios-bug',
              title: '文章'
            },
            component: () => import('@/components/article/ArticleView.vue')
      },
      {
        path: 'viewQuestion/:id',
            name: '问题',
            meta: {
              hideInBread: true,
              hideInMenu: true,
              icon: 'ios-bug',
              title: '问题'
            },
            component: () => import('@/components/question/QuestionView.vue')
      },
    ]
  },
  {
    path: '/argu',
    name: 'argu',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'params/:id',
        name: 'params',
        meta: {
          icon: 'md-flower',
          title: route => `{{ params }}-${route.params.id}`,
          notCache: true,
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/argu-page/params.vue')
      },
      {
        path: 'query',
        name: 'query',
        meta: {
          icon: 'md-flower',
          title: route => `{{ query }}-${route.query.id}`,
          notCache: true
        },
        component: () => import('@/view/argu-page/query.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
