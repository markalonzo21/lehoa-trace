import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./core/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "p",
    children: [
      {
        path: "pagenotfound",
        loadChildren: () =>
          import("./public/pagenotfound/pagenotfound.module").then(
            (m) => m.PagenotfoundPageModule
          ),
      },
    ],
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./profile/profile.module").then((m) => m.ProfilePageModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
