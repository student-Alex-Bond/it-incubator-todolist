import {AddItemForm} from "../components/AddItemForm";
import React from "react";
import {action} from '@storybook/addon-actions'

export default {
    title: 'My Stories/AddItemForm Component',
    component: AddItemForm
}

const callback = action("press button to add value input")

export const AddItemFormBaseExample = () => {
    return <AddItemForm addItem={callback}/>
}