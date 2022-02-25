import React from "react"
import Landing from './Landing'
import './style/index.less'

export default () => {
    return <div className="demo-app">
        <header className="demo-app-header">
            <h1>Brocoli & Co</h1>
        </header>
        <div style={{ flex: 1 }}>
            <Landing />
        </div>
        <footer className="demo-app-footer">
            Made with Co & Melbourne <br></br>
            sadadsad
        </footer>
    </div>
}