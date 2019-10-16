import * as React from 'react';
import './landing.scss'
import * as landingActions from "./landingActions";
import {LandingTabs, LoginInputs, LoginValidities, RegisterInputs, RegisterValidities} from "./landingReducer";
import {pushHistory, verifyLogin} from "./landingActions";
import {verifyRegister} from "./landingActions";
import {Input} from "../../components/input";
import LanguageHelper from "../../languageHelper";
import {Checkbox} from "../../components/checkbox";
import {ExtendingButton} from "../../components/extendingButton";
import {setSideDialog} from "../sideDialog/sideDialogActions";
import TouchClick from "../../components/touchClick";

export interface LandingProps {
    login: LoginInputs,
    register: RegisterInputs,

    setLoginInput: typeof landingActions.setLoginInput,
    setRegisterInput: typeof landingActions.setRegisterInput,
    activeTab: LandingTabs
    setActiveTab: typeof landingActions.setActiveTab,

    loginValidities: LoginValidities,
    registerValidities: RegisterValidities,

    verifyLogin: typeof verifyLogin,
    verifyRegister: typeof verifyRegister,

    someField?: boolean,

    sideDialog: boolean
    setSideDialog: typeof setSideDialog,
    pushHistory: typeof pushHistory
}

export default class Landing extends React.Component<LandingProps, {}> {

    render() {
        const {
            login,
            register,
            setLoginInput,
            setRegisterInput,
            activeTab,
            setActiveTab,
            loginValidities,
            registerValidities,
            verifyLogin,
            verifyRegister,
            setSideDialog,
            pushHistory
        } = this.props;
        return (
            <div className="landing">

                <div className="section1">

                    <div className="contentWrapper">
                        <div className="logo"/>
                        <div className="loginRegisterWrapper">
                            <div className="tabs">
                                <div className={"tab login" + (activeTab === 'login' ? " active" : "")}
                                     onClick={() => setActiveTab('login')}>
                                    {LanguageHelper.getString('button_login')}
                                </div>
                                <div className={"tab register" + (activeTab === 'register' ? " active" : "")}
                                     onClick={() => setActiveTab('register')}>
                                    {LanguageHelper.getString('button_register')}
                                </div>
                            </div>
                            {activeTab === 'login' ?
                                <div className="loginInputWrapper">
                                    <Input
                                        label={LanguageHelper.getString('label_username')}
                                        onChange={(text: string) => setLoginInput({key: 'username', value: text})}
                                        type={'text'}
                                        value={login.username}
                                        valid={loginValidities.usernameAndPassword}/>
                                    <Input
                                        label={LanguageHelper.getString('label_password')}
                                        onChange={(text: string) => setLoginInput({key: 'password', value: text})}
                                        type={login.passwordVisibility ? 'text' : 'password'}
                                        value={login.password}
                                        valid={loginValidities.usernameAndPassword}
                                        validityInfo={LanguageHelper.getString('feedback_login')}/>
                                    <Checkbox label={'stay logged in'} value={login.stayLoggedIn}
                                              onChange={(e: boolean) => setLoginInput({
                                                  key: "stayLoggedIn",
                                                  value: e
                                              })}/>
                                    <button onClick={() => verifyLogin(login)}>Login</button>
                                    <ExtendingButton icon={'/assets/test_image.png'} label={'Testbutton'}
                                                     onClick={() => {
                                                         setSideDialog({
                                                             content: <div>I AM CONTENT :D</div>,
                                                             buttons: [
                                                                 {
                                                                     icon: '/assets/test_image.png',
                                                                     label: 'Side Button',
                                                                     onClick: () => console.log('WORKS :DD')
                                                                 },
                                                                 {
                                                                     icon: '/assets/test_image.png',
                                                                     label: 'Side Button2',
                                                                     onClick: () => console.log('WORKS2 :DD')
                                                                 },
                                                                 {
                                                                     icon: '/assets/test_image.png',
                                                                     label: 'Side Button3',
                                                                     onClick: () => console.log('WORKS3 :DD')
                                                                 }
                                                             ],
                                                             header: 'SideDialog'
                                                         })
                                                     }}/>
                                </div> :
                                <div className="registerInputWrapper">
                                    <Input
                                        label={LanguageHelper.getString('label_username')}
                                        onChange={(text: string) => setRegisterInput({key: 'username', value: text})}
                                        type={'text'}
                                        value={register.username}
                                        valid={registerValidities.username}
                                        validityInfo={LanguageHelper.getString('feedback_username')}/>
                                    <Input
                                        label={LanguageHelper.getString('label_email')}
                                        onChange={(text: string) => setRegisterInput({key: 'email', value: text})}
                                        type={'text'}
                                        value={register.email}
                                        valid={registerValidities.email}
                                        validityInfo={LanguageHelper.getString('feedback_email')}/>
                                    <Input
                                        label={LanguageHelper.getString('label_password')}
                                        onChange={(text: string) => setRegisterInput({key: 'password', value: text})}
                                        type={register.passwordVisibility ? 'text' : 'password'}
                                        value={register.password}
                                        valid={registerValidities.password}
                                        validityInfo={LanguageHelper.getString('feedback_password')}/>
                                    <Input
                                        label={LanguageHelper.getString('label_passwordRepeat')}
                                        onChange={(text: string) => setRegisterInput({
                                            key: "repeatedPassword",
                                            value: text
                                        })}
                                        type={register.repeatedPasswordVisibility ? 'text' : 'password'}
                                        value={register.repeatedPassword}
                                        valid={registerValidities.repeatedPassword}
                                        validityInfo={LanguageHelper.getString('feedback_passwordRepeat')}/>
                                    <button onClick={() => verifyRegister(register)}>Register</button>
                                    <Checkbox label={'agreed'} value={register.policyAgreed}
                                              onChange={(e: boolean) => setRegisterInput({
                                                  key: "policyAgreed",
                                                  value: e
                                              })}
                                              valid={registerValidities.repeatedPassword}
                                              validityInfo={LanguageHelper.getString('feedback_policyAgreed')}/>
                                </div>}

                        </div>
                    </div>


                    <TouchClick onClick={() => pushHistory('/petsAndPlans')}> go to pets and plans</TouchClick>


                    <div className="accentBackground"/>
                    <div className="accentSpacer"/>
                </div>
                <div className="section2">
                    <div className="accentBackground"/>
                    <div className="contentWrapper">
                        <h1>
                            {LanguageHelper.getString('section2Header1')}
                        </h1>
                        <p>
                            {LanguageHelper.getString('section2Paragraph1')}
                        </p>
                        <p>
                            {LanguageHelper.getString('section2Paragraph2')}
                        </p><h1>
                        {LanguageHelper.getString('section2Header2')}
                    </h1>
                        <p>
                            {LanguageHelper.getString('section2Paragraph3')}
                        </p>
                        <p>
                            {LanguageHelper.getString('section2Paragraph4')}
                        </p>
                    </div>

                </div>
            </div>
        );
    }
}
