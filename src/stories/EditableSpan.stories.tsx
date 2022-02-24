
import React from "react";
import {action} from '@storybook/addon-actions'
import EditableSpan from "../components/EditableSpan";

export default {
    title: 'My Stories/EditableSpan Component',
    component: EditableSpan
}

const callback = action("editable span")

export const EditableSpanBaseExample = () => {
    return <EditableSpan title={'test'} onChange={callback}/>
}