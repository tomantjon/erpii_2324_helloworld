sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, MessageToast, JSONModel) {
    "use strict";

    return Controller.extend("helloworld.hogent.be.helloworld.controller.App", {
      onInit: function () {
        var oView = this.getView();
        oView.setModel(new JSONModel({ name: "", email: "" }));
      },
      onPress: function (evt) {
        var oView = this.getView(),
          aInputs = [oView.byId("nameInput")],
          bValidationError = false;

        // Check that inputs are not empty.
        // Validation does not happen during data binding as this is only triggered by user actions.
        aInputs.forEach(function (oInput) {
          bValidationError = this._validateInput(oInput) || bValidationError;
        }, this);

        if (!bValidationError) {
          var oModel = this.getView().getModel().getData();
          MessageToast.show("Hello " + oModel.name);
        } else {
          MessageToast.show(
            "A validation error has occurred. Complete your input first."
          );
        }
      },

      _validateInput: function (oInput) {
        var sValueState = "None";
        var bValidationError = false;
        var oBinding = oInput.getBinding("value");

        try {
          oBinding.getType().validateValue(oInput.getValue());
        } catch (oException) {
          sValueState = "Error";
          bValidationError = true;
        }

        oInput.setValueState(sValueState);

        return bValidationError;
      },

      onNameChange: function (oEvent) {
        var oInput = oEvent.getSource();
        this._validateInput(oInput);
      },
    });
  }
);
