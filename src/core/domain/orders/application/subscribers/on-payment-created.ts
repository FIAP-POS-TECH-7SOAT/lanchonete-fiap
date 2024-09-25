import { DomainEvents } from "@application/common/events/domain-events"
import { EventHandler } from "@application/common/events/event-handler"
import { DomainEvent } from "@application/common/events/domain-event";
import { EventMap } from "@application/common/events/events-registered";

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
      EventMap.PaymentCreatedEvent.key,
    )
  }

  private async sendPaymentCreatedNotification({ data }: DomainEvent<typeof EventMap['PaymentCreatedEvent']['type']>) {
    
    await this.addCodeToOrderByIdUseCase.execute({
      id:data.order_id.toString()
    })
    
    
  }
}


