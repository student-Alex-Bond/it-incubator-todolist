import React from 'react'
import AppWithRedux from "../AppWithRedux";
import {Meta, Story} from '@storybook/react/types-6-0'
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title: 'My Stories/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator],
    argTypes: {},
} as Meta

const Template: Story = (args) => <AppWithRedux {...args}/>

export const AppWithReduxExample = Template.bind({})
AppWithReduxExample.args={}