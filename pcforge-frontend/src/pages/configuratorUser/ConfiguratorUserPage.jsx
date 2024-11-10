import React from 'react'
import Background from '../../components/template/Background'
import Navigation from '../../components/template/Navigation'
import ConfiguratorUser from '../../components/configuratorUser/ConfiguratorUser'

const ConfiguratorUserPage = () => {
    return (
        <>
            <Background>
                <Navigation/>
                <ConfiguratorUser/>
            </Background>
        </>
    )
}

export default ConfiguratorUserPage