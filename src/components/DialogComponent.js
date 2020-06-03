import React from 'react'
import { ConfirmDialog } from 'react-native-simple-dialogs';

const DialogComponent = ({ isVisible, closeDialog, title = "Error", message = "An error occured while perfoming the operation." }) => {
  return (
    <ConfirmDialog
      visible={isVisible}
      onTouchOutside={closeDialog}
      title={title}
      message={message}
      positiveButton={{
        title: "Got it!",
        onPress: () => closeDialog()
      }}
    />

  )
}

export default DialogComponent
