import { Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PulpitPage {
  constructor(private page: Page) {}

  sideMenu = new SideMenuComponent(this.page);

  //Pulpit tranfer
  pulpitReceiverInput = this.page.locator('#widget_1_transfer_receiver');
  pulpitAmountInput = this.page.locator('#widget_1_transfer_amount');
  pulpitTranferTitleInput = this.page.locator('#widget_1_transfer_title');
  pulpitTranferButton = this.page.getByRole('button', { name: 'wykonaj' });
  pulpitActionCloseButton = this.page.getByTestId('close-button');
  pulpitTransferMessage = this.page.locator('#show_messages');

  //Topup transfer
  topupReceiver = this.page.locator('#widget_1_topup_receiver');
  topupAmount = this.page.locator('#widget_1_topup_amount');
  topupAgreement = this.page.locator('#widget_1_topup_agreement');
  topupPhone = this.page.locator('#execute_phone_btn');

  //Correct Balance
  topupMoneyValueText = this.page.locator('#money_value');

  userNameText = this.page.getByTestId('user-name');

  async pulpitTransfer(
    receiverId: string,
    transferAmount: string,
    transferTitle: string,
  ): Promise<void> {
    await this.pulpitReceiverInput.selectOption(receiverId);
    await this.pulpitAmountInput.fill(transferAmount);
    await this.pulpitTranferTitleInput.fill(transferTitle);
    await this.pulpitTranferButton.click();
    await this.pulpitActionCloseButton.click();
  }

  async topUpTransfer(
    topUpReceiver: string,
    topUpAmount: string,
  ): Promise<void> {
    await this.topupReceiver.selectOption(topUpReceiver);
    await this.topupAmount.fill(topUpAmount);
    await this.topupAgreement.click();
    await this.topupPhone.click();
    await this.pulpitActionCloseButton.click();
  }
}
