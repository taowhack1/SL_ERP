import React from 'react';
import { Layout} from 'antd'
import TopContent from './TopComponent'
import MainHeader from './MainHeader'
import MainFooter from './MainFooter'

const { Header, Content } = Layout;

function MainLayout(props){
    return (
        <>
            <Layout>
                <Header>
                    <MainHeader/>
                </Header>
                <TopContent buttonAction={props.buttonAction} discard={props.discard}/>
                <Content id="content">
                    {props.children}
                </Content>
                <MainFooter/>
            </Layout>
        </>
    )
}

export default MainLayout;