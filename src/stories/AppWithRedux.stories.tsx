import React from 'react'
import AppWithRedux from "../components/App/AppWithRedux";
import {Meta, Story} from '@storybook/react/types-6-0'
import {HashRouterDecorator, ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";


export default {
    title: 'My Stories/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator, HashRouterDecorator],
    argTypes: {},
} as Meta

const Template: Story = (args) => <AppWithRedux demo={true} {...args}/>

export const AppWithReduxExample = Template.bind({})
AppWithReduxExample.args={}