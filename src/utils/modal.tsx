import { modalController } from "@ionic/core";

export const addModal = async (component, presentingElement) => {
  if (presentingElement.current != null) {
    const modal = await modalController.create({
      component,
      swipeToClose: true,
      presentingElement: presentingElement.current,
    });
    await modal.present();
  }
};
