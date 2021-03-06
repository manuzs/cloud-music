import React, { lazy, Suspense } from "react";
import { Redirect } from "react-router-dom";
import HomeLayout from "@layouts/HomeLayout";
import BlankLayout from "@layouts/BlankLayout";

const SuspenseComponent = Component => props => {
  return (
    <Suspense fallback={null}>
      <Component {...props}></Component>
    </Suspense>
  );
}; // 高阶组件返回被Suspense包裹的组件，fallback=组件未渲染执行的loading

const RecommendComponent = lazy(() => import("@app/Recommend/"));
const AlbumComponent = lazy(() => import("@app/Album"));
const SingersComponent = lazy(() => import("@app/Singers"));

export default [
  {
    component: BlankLayout,
    routes: [
      {
        path: "/",
        component: HomeLayout,
        routes: [
          {
            path: "/",
            exact: true,
            render: () => <Redirect to={"/recommend"} />
          },
          {
            path: "/recommend",
            component: SuspenseComponent(RecommendComponent),
            routes: [
              {
                path: "/recommend/:id",
                component: SuspenseComponent(AlbumComponent)
              }
            ]
          },
          {
            path: "/singers",
            component: SuspenseComponent(SingersComponent)
          }
        ]
      }
    ]
  }
];
