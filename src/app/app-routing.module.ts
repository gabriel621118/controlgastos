import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { BaseComponent } from './layout/base/base.component';






const routes: Routes = [

 
  {
    path: '',
    component: BaseComponent,
   // canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
     
        {
          path: 'datos-maestros',
          loadChildren: () => import('./pages/datos-maestros/datos-maestros.module').then(m => m.DatosMaestrosModule)
        },
        {
          path: 'components',
          loadChildren: () => import('./pages/components/components.module').then(m => m.ComponentsModule)
        },
    
     // { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
//   { 
//     path: 'error',
//     component: ErrorPageComponent,
//     data: {
//       'type': 404,
//       'title': 'Page Not Found',
//       'desc': 'Oopps!! The page you were looking for doesn\'t exist.'
//     }
//   },
//   {
//     path: 'error/:type',
//     component: ErrorPageComponent
//   },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];


@NgModule({
  //imports: [RouterModule.forRoot(routes)],
  //exports: [RouterModule],
  
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]

})
export class AppRoutingModule { }




/*


const routes: Routes = [
  { path:'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'ventas',
        loadChildren: () => import('./pages/ventas/ventas.module').then(m => m.VentasModule)
      },
      {
        
        path: 'compras',
        loadChildren: () => import('./pages/compras/compras.module').then(m => m.ComprasModule)
      },
      {
        path: 'almacen',
        loadChildren: () => import('./pages/almacen/almacen.module').then(m => m.AlmacenModule)
      },
      {
        path: 'manufactura',
        loadChildren: () => import('./pages/manufactura/manufactura.module').then(m => m.ManufacturaModule)
      },
      {
        path: 'datos-maestros',
        loadChildren: () => import('./pages/datos-maestros/datos-maestros.module').then(m => m.DatosMaestrosModule)
      },
      {
        path: 'catalogos',
        loadChildren: () => import('./pages/catalogos/catalogos.module').then(m => m.CatalogosModule)
      },
      {
        path: 'reportes',
        loadChildren: () => import('./pages/reportes/reportes.module').then(m => m.ReportesModule)
      },
      {
        path: 'gerencia',
        loadChildren: () => import('./pages/gerencia/gerencia.module').then(m => m.GerenciaModule)
      },
      {
        path: 'reportes',
        loadChildren: () => import('./pages/reportes/reportes.module').then(m => m.ReportesModule)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
      // { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
//   { 
//     path: 'error',
//     component: ErrorPageComponent,
//     data: {
//       'type': 404,
//       'title': 'Page Not Found',
//       'desc': 'Oopps!! The page you were looking for doesn\'t exist.'
//     }
//   },
//   {
//     path: 'error/:type',
//     component: ErrorPageComponent
//   },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


*/
