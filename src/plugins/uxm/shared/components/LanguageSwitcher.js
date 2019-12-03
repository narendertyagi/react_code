import React from 'react'
import { Select } from 'antd';
class Dropdown extends Select {
    constructor(props) {
        super(props);

        this.state = {
            listOpen: false,
            headerTitle: null,
            language: null,
            languageList: []
        }
    }

    componentDidMount() {
        this.setState({
            language: Sapp.UxmShared.TranslationC.getLang()
        })
        this.fetch()
    }

    fetch = () => {
        Sapp.UxmShared.Api.Language.listAll().then((res) => {
                this.setState({
                    languageList: res.data.results,
                });
            });
    }
      
    chooseTheme = async (language, evt) => {
        evt.preventDefault();
        this.setState({ language });
        await Sapp.UxmShared.TranslationC.setLang(language)
        await Sapp.UxmShared.TranslationC.fetchAndSetOptions()
        window.location.reload()
    }

    render() {
        const { language } = this.state;
        const {languageList} =   this.state
        const currentLangCode = Sapp.UxmShared.TranslationC.getLang()
        return (
            <div className="compLanguageSwitcher">                
                <div className="btn-group flagBtn">                
                    <a  href="#" className="dropdown-toggle" id="dropdownLanguageSwitcherMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span>
                        <span className="flagicon" style={{backgroundImage: `url('./images/flags/${currentLangCode}.png')`}}></span>
                        {currentLangCode.toUpperCase()}</span>
                    </a>                    
                    <div className="dropdown-menu w-200 dropdown-menu-right" aria-labelledby="dropdownLanguageSwitcherMenuButton">
                    <ul>
                        {languageList.map((language) => {
                            return (
                                <li key={language._id}>
                                    <a className="dropdown-item" href="#" onClick={e => this.chooseTheme( language.code, e)}>
                                        <span className="flagicon" style={{backgroundImage: `url('./images/flags/${language.code}.png')`}}></span>
                                        {language.title}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                    </div>                    
                </div>                
            </div>
        )
    }
}


export default Dropdown;
