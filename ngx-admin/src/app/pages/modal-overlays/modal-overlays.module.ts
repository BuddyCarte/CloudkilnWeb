import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDialogModule,
  NbInputModule,
  NbPopoverModule,
  NbSelectModule,
  NbTabsetModule,
  NbTooltipModule,
  NbWindowModule,
} from '@nebular/theme';

// modules
import {ThemeModule} from '../../@theme/theme.module';
import {ModalOverlaysRoutingModule} from './modal-overlays-routing.module';

// components
import {ModalOverlaysComponent} from './modal-overlays.component';
import {DialogComponent} from './dialog/dialog.component';
import {ShowcaseDialogComponent} from './dialog/showcase-dialog/showcase-dialog.component';
import {DialogNamePromptComponent} from './dialog/dialog-name-prompt/dialog-name-prompt.component';
import {WindowComponent} from './window/window.component';
import {WindowFormComponent} from './window/window-form/window-form.component';
import {ToastrComponent} from './toastr/toastr.component';
import {PopoversComponent} from './popovers/popovers.component';
import {
  NgxPopoverCardComponent, NgxPopoverFormComponent,
  NgxPopoverTabsComponent,
} from './popovers/popover-examples.component';
import {TooltipComponent} from './tooltip/tooltip.component';
import {DialogFactoryAddEditComponent} from '../factory-management/factory-add-or-edit/dialog-factory-add-edit.component';
import {UserAddOrEditComponent} from '../user-management/user-add-or-edit/user-add-or-edit.component';


const COMPONENTS = [
  ModalOverlaysComponent,
  ToastrComponent,
  DialogComponent,
  ShowcaseDialogComponent,
  DialogNamePromptComponent,
  DialogFactoryAddEditComponent,
  WindowComponent,
  WindowFormComponent,
  PopoversComponent,
  NgxPopoverCardComponent,
  NgxPopoverFormComponent,
  NgxPopoverTabsComponent,
  TooltipComponent,
  UserAddOrEditComponent,
];

const ENTRY_COMPONENTS = [
  ShowcaseDialogComponent,
  DialogNamePromptComponent,
  DialogFactoryAddEditComponent,
  WindowFormComponent,
  NgxPopoverCardComponent,
  NgxPopoverFormComponent,
  NgxPopoverTabsComponent,
  UserAddOrEditComponent,
];

const MODULES = [
  FormsModule,
  ThemeModule,
  ModalOverlaysRoutingModule,
  NbDialogModule.forChild(),
  NbWindowModule.forChild(),
  NbCardModule,
  NbCheckboxModule,
  NbTabsetModule,
  NbPopoverModule,
  NbButtonModule,
  NbInputModule,
  NbSelectModule,
  NbTooltipModule,
];

const SERVICES = [];

@NgModule({
  imports: [
    ...MODULES,
    ReactiveFormsModule,
  ],
  declarations: [
    ...COMPONENTS,
  ],
  providers: [
    ...SERVICES,
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS,
  ],
})
export class ModalOverlaysModule {
}
