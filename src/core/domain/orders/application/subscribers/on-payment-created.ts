import { DomainEvents } from "@application/common/events/domain-events"
import { EventHandler } from "@application/common/events/event-handler"
import { PaymentCreatedEvent } from "@application/domain/payments/application/events/payment-created-event"

import { AddCodeToOrderByIdUseCase } from "../use-case/add-code-to-order-by-id-use-case";


export class OnPaymentCreated implements EventHandler {
  constructor(
    private addCodeToOrderByIdUseCase: AddCodeToOrderByIdUseCase,
    
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendPaymentCreatedNotification.bind(this),
      PaymentCreatedEvent.name,
    )
  }

  private async sendPaymentCreatedNotification({ payment }: PaymentCreatedEvent) {

    await this.addCodeToOrderByIdUseCase.execute({
      id:payment.order_id.toString()
    })
    
    
  }
}


