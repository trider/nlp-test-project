import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    children: [
      { path: '', redirectTo: '/main/home', pathMatch: 'full' },
      {
        path: "main",
        loadChildren: () =>
          import("./main/main.module").then((m) => m.MainModule),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
    
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
