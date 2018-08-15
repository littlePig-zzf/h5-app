import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const view = file => () => import(`./views/${file}.vue`);

/**
 * 路由的定义和分组和接口保持一致
 * 路由的 name 与 api 请求保持一致!
 * @see http://apidoc.alaskamob.com/
 */
const router = new Router({
  mode: "history",
  base: "/app/",
  routes: [
    { path: "/", redirect: "/home" },
    {
      path: "/home",
      name: "home",
      component: view("home"),
      meta: {
        keepAlive: true
      }
    },
    {
      path: `/category`,
      name: "category",
      component: view("category"),
      meta: {
        keepAlive: true,
        group: "category"
      }
    },
    {
      path: "/comic/history",
      name: "comicHistory",
      alias: ["/bookshelf"], // 书架首页定向至此
      component: view("bookshelf"),
      meta: {
        group: "bookshelf"
      }
    },
    {
      path: "/comic/bookmark",
      name: "comicBookmark",
      component: view("bookshelf"),
      meta: {
        group: "bookshelf"
      }
    },
    {
      path: "/comic/:id(\\d+)",
      name: "comic",
      component: view("comic"),
      meta: {
        keepAlive: true,
        hideBottom: true
      }
    },
    {
      path: "/chapter/:id(\\d+)",
      name: "chapter",
      component: view("chapter"),
      meta: {
        keepAlive: true,
        hideBottom: true
      }
    },
    {
      path: "/recommend",
      alias: ["/hot"],
      name: "recommend",
      component: view("rank"),
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/rank/:id(\\d+)",
      name: "rank",
      component: view("rank"),
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/section/:id(\\d+)",
      name: "section",
      component: view("section")
    },
    {
      path: "/user/topup",
      name: "topup",
      alias: "/topup",
      component: view("user/topup"),
      meta: {
        hideBottom: true
      }
    },
    {
      path: "/user",
      name: "user",
      component: view("user/index"),
      meta: {
        keepAlive: true,
        group: "user"
      }
    },
    {
      path: "/user/transaction/expend",
      name: "expend",
      alias: ["/expend", "/user/expend"],
      component: view("user/transaction"),
      meta: {
        hideBottom: true
      }
    },
    {
      path: "/user/transaction/income",
      name: "income",
      alias: ["/income", "/user/income"],
      component: view("user/transaction"),
      meta: {
        hideBottom: true
      }
    },
    {
      path: "/contact",
      name: "contact",
      alias: ["/user/contact"],
      component: view("user/contact"),
      meta: {
        keepAlive: true,
        hideBottom: true
      }
    },
    {
      path: "/search",
      name: "search",
      component: view("search")
    }
  ],

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    return false;
  }
});

export default router;
