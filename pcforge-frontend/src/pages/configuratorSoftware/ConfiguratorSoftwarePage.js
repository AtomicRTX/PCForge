import React from 'react'
import Background from '../../components/template/Background'
import Navigation from '../../components/template/Navigation'
import ConfiguratorSoftware from '../../components/configuratorSoftware/ConfiguratorSoftware'

const ConfiguratorUserPage = () => {
    return (
        <>
            <Background>
                <Navigation/>
                <ConfiguratorSoftware/>
            </Background>
        </>
    )
}

export default ConfiguratorUserPage