(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{43:function(e,t,n){},49:function(e,t,n){},50:function(e,t,n){e.exports=n.p+"static/media/long-bell.f3aa308a.mp3"},51:function(e,t,n){e.exports=n.p+"static/media/bowl-struck.2e1feb19.mp3"},52:function(e,t,n){e.exports=n.p+"static/media/bell4.68b60366.mp3"},53:function(e,t,n){e.exports=n.p+"static/media/buddhist-prayer-bell.fa1328fc.mp3"},54:function(e,t,n){e.exports=n.p+"static/media/gong-burmese.368c1978.wav"},55:function(e,t,n){e.exports=n.p+"static/media/gong-chinese.b8a8b3be.wav"},56:function(e,t,n){e.exports=n.p+"static/media/tingsha.760cc3b2.wav"},57:function(e,t,n){e.exports=n.p+"static/media/zen-bell.85f7bec3.mp3"},64:function(e,t,n){e.exports=n.p+"static/media/cog-solid.9f07a3df.svg"},73:function(e,t,n){e.exports=n(84)},78:function(e,t,n){},79:function(e,t,n){},84:function(e,t,n){"use strict";n.r(t);var a=n(0),s=n.n(a),o=n(9),i=n.n(o),c=(n(78),n(29)),r=n(12),l=n(13),u=n(16),d=n(15);n(43);var p=function(e){var t=e.hoursDisplayed;return s.a.createElement("div",{className:"titlesContainer"},s.a.createElement("div",{className:"titleSpan ".concat(t?"":"hide")},"HOURS"),s.a.createElement("div",{className:"titleSpan"},"MINUTES"),s.a.createElement("div",{className:"titleSpan"},"SECONDS"))},m=function(){};var h=function(e,t,n){var a=arguments.length>3&&void 0!==arguments[3]&&arguments[3],s=n.startClock,o=n.pauseClock;return a?m:e&&!t?o:s},f=function(e,t,n,a){return e&&0===t&&0===n&&0===a},v=function(e){return+e.toFixed()};function k(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"sum";switch(n){case"sum":return g(e+t);case"rest":return g(e-t);default:return g(e+t)}}function g(e){var t=e,n={seconds:0,minutes:0,hours:0};if(t<60)return n.seconds=v(t),n;if((t/=60)<60){n.minutes=Number.parseInt(t);var a=e-60*n.minutes;return n.seconds=v(a),n}if((t/=60)<=99){n.hours=Number.parseInt(t),n.minutes=Number.parseInt(e/60-60*n.hours);var s=e-60*n.minutes-3600*n.hours;return n.seconds=v(s),n}n.seconds=59,n.minutes=59,n.hours=99}function C(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,a=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],s=e,o=t,i=n;return s<=60&&o<=60&&i<=99||(s>60&&(s-=60,o+=1),a&&o>60&&(o-=60,i+=1),i>99&&(i=99,o=59,s=59)),{seconds:s,minutes:o,hours:i}}var b=function(e){var t=e.toString();return e<10?["0",t]:[t[0],t[1]]},S="seconds",I="minutes",E="hours",y=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(r.a)(this,n),(a=t.call(this,e)).removeClassOfSpanExceptTargeted=function(e,t){var n=e.find((function(e){return e.element===t}));if(!n)return a.setState({activeSpan:null});a.setState({activeSpan:n.element}),a.props.setPositionOfCursorInInput(n.positionInClockRightToLeft-1)},a.selectBorderForSpan=function(){var e=a.props,t=e.spanToBorder,n=e.focusOnInput,s=a.spanRefsSettings.map((function(e){var t=Object.assign({},e),n=t.positionInClockRightToLeft,s=t.ref;return t.element=a[s],t.defaultSelectedSpan=1===n,t}));if(n){var o=s.map((function(e){return e.element})),i=o.find((function(e){return e.classList.contains("activeSpan")?e:void 0})),c=!!t&&t.classList.contains("defaultSpanColor");if(!(i&&!c||i&&!t||t&&!o.includes(t)))if((i||t)&&(i||c))a.removeClassOfSpanExceptTargeted(s,t);else{var r=s.find((function(e){return!0===e.defaultSelectedSpan})).element;a.removeClassOfSpanExceptTargeted(s,r)}}else a.removeClassOfSpanExceptTargeted(s,null)},a.state={activeSpan:null},a.spanRefsSettings=[{positionInClockRightToLeft:6,ref:"secondDigitHours",unit:E},{positionInClockRightToLeft:5,ref:"firstDigitHours",unit:E},{positionInClockRightToLeft:4,ref:"secondDigitMinutes",unit:I},{positionInClockRightToLeft:3,ref:"firstDigitMinutes",unit:I},{positionInClockRightToLeft:2,ref:"secondDigitSeconds",unit:S},{positionInClockRightToLeft:1,ref:"firstDigitSeconds",unit:S}],a}return Object(l.a)(n,[{key:"componentDidUpdate",value:function(e){e.spanToBorder===this.props.spanToBorder&&e.focusOnInput===this.props.focusOnInput||this.selectBorderForSpan()}},{key:"render",value:function(){var e,t=this,n=this.props,a=n.hours,o=n.focusOnInput,i=n.inputValueLength,r=n.handleClockEvents,l=n.isCountDown,u=this.state.activeSpan,d=(e={},Object(c.a)(e,S,b(this.props.seconds)),Object(c.a)(e,I,b(this.props.minutes)),Object(c.a)(e,E,b(this.props.hours)),e),p=this.spanRefsSettings.map((function(e,t){var n=Object.assign({},e),a=d[e.unit][t%2];return n.value=a,n})).map((function(e){var n=e.positionInClockRightToLeft,a=e.ref,c=e.value;return s.a.createElement("span",{key:a,ref:function(e){return t[a]=e},className:"".concat(u===t[a]?"activeSpan":""," ").concat(o&&i<n?"withoutInputValue":l?"defaultSpanColor":"")},c)})),m=p.slice(0,2),h=p.slice(2,4),f=p.slice(4,6);return s.a.createElement("div",{className:"numbersContainer ".concat(!o&&l?"clockDefined":""),onClick:r,onMouseDown:r},s.a.createElement("div",{className:"hoursContainer ".concat(0!==a||o?"":"hide")},s.a.createElement("div",{className:"numbers"},m),s.a.createElement("div",{className:"numbers"},":")),s.a.createElement("div",{className:"numbers"},h),s.a.createElement("div",{className:"numbers"},":"),s.a.createElement("div",{className:"numbers"},f))}}]),n}(a.Component);y.defaultProps={seconds:0,minutes:0,hours:0,focusOnInput:!1,inputValueLength:0,handleClockEvents:m};var O=y;var N=function(e){var t=e.firstButton,n=e.secondButton;return s.a.createElement("div",{className:"clockButtonsContainer"},s.a.createElement("button",{className:"clockButtons ".concat(t.className),onClick:t.onClick,ref:t.ref},t.text),s.a.createElement("button",{className:"clockButtons ".concat(n.className),onClick:n.onClick,ref:n.ref},n.text))},T=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;Object(r.a)(this,n),(a=t.call(this,e)).tick=function(){var e=a.state,t=e.seconds,n=e.minutes,s=e.hours;if(a.props.isCountDown&&0===t&&0===n&&0===s)return a.stopClock(),void a.props.bellStarting();if(a.props.isCountDown||59!==t||59!==n||99!==s){var o=function(e,t,n,a){var s=t,o=n,i=a;return e?0===s?(s=59,0===o?(o=59,i--):o--):s--:59===s?(s=0,59===o?(o=0,i++):o++):s++,{nextSecond:s,nextMinute:o,nextHour:i}}(a.props.isCountDown,t,n,s),i=o.nextSecond,c=o.nextMinute,r=o.nextHour,l=Number.isInteger(c/a.props.ringEvery)&&0===i;!a.props.isCountDown&&l&&a.props.bellStarting(),a.setState({seconds:i,minutes:c,hours:r})}else a.stopClock()},a.startClock=function(){a.clockId=setInterval(a.tick,1e3),a.setState({clockStarted:!0,clockPaused:!1})},a.pauseClock=function(){clearInterval(a.clockId),a.setState({clockPaused:!0})},a.stopClock=function(){var e=a.props,t=e.seconds,n=e.minutes,s=e.hours;clearInterval(a.clockId),a.setState({clockStarted:!1,clockPaused:!1,seconds:t,minutes:n,hours:s})},a.setNewTimer=function(e,t,n){var s=C(e,t,n),o=s.minutes,i=s.seconds,c=s.hours;a.setState({seconds:i,minutes:o,hours:c})},a.keyPressingOnClock=function(e){var t=a.state,n=t.clockStarted,s=t.clockPaused,o=a.props,i=o.isCountDown,c=o.focusOnInput,r=o.hours,l=o.minutes,u=o.seconds;if(document.activeElement!==a.startAndPauseButton){var d=function(e){var t=e.clockStatus,n=e.clockByUnits,a=e.clockMethods,s=e.setNewTimer,o=e.focusOnInputSettings,i=e.isCountDown,c=t.clockStarted,r=t.clockPaused,l=n.seconds,u=n.minutes,d=n.hours,p=o.isFocused,m=o.handleFocus,v=[];c||r||v.push((function(){return s(l,u,d)})),i&&p&&v.push((function(){return m(!1)}));var k=f(i,l,u,d),g=h(c,r,a,k);return v.push(g),v}({clockStatus:{clockStarted:n,clockPaused:s},clockByUnits:{seconds:u,minutes:l,hours:r},clockMethods:a.clockMethods,focusOnInputSettings:{isFocused:c,handleFocus:function(){return a.props.handleOnInputFocus(!1)}},setNewTimer:a.setNewTimer,isCountDown:i});switch(e){case"Enter":d.forEach((function(e){return e()}))}}},a.handleClockInactivity=function(){var e,t=a.state,n=t.seconds,s=t.minutes,o=t.hours,i=a.props.timeInactivity.inactivityInSeconds,c=(e={seconds:n,minutes:s,hours:o}).seconds+60*e.minutes+3600*e.hours,r=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.seconds,n=e.minutes,s=e.hours;a.setNewTimer(t,n,s),a.startClock()};a.props.isCountDown?r(k(c,i,"rest")):r(k(c,i,"sum"))};var s=a.props,o=s.seconds,i=s.minutes,c=s.hours;return a.state={clockStarted:!1,clockPaused:!1,seconds:o,minutes:i,hours:c},a.clockMethods={startClock:a.startClock,pauseClock:a.pauseClock,stopClock:a.stopClock},a}return Object(l.a)(n,[{key:"componentDidUpdate",value:function(e){var t=this.state,n=t.clockStarted,a=t.clockPaused,s=this.props,o=s.focusOnInput,i=s.inputValueLength,c=s.keyPressed,r=0!==this.state.hours||this.props.focusOnInput,l=!this.props.inputValueLength&&!n&&!a&&(this.state.hours!==e.hours||this.state.minutes!==e.minutes||this.state.seconds!==e.seconds);if(e.keyPressed!==c&&this.keyPressingOnClock(this.props.keyPressed),i&&a&&this.stopClock(),o&&!e.focusOnInput&&n&&this.pauseClock(),l&&this.setNewTimer(e.seconds,e.minutes,e.hours),r!==this.props.hoursDisplayedInClock.value){var u=this.props.hoursDisplayedInClock;(0,u.setHoursInClock)(u.stateName,r)}e.timeInactivity.isTabActive&&!this.props.timeInactivity.isTabActive&&n&&this.pauseClock(),!e.timeInactivity.isTabActive&&this.props.timeInactivity.isTabActive&&a&&this.handleClockInactivity()}},{key:"render",value:function(){var e=this,t=this.state,n=t.clockStarted,a=t.clockPaused,o=this.props.inputValueLength?this.props.seconds:this.state.seconds,i=this.props.inputValueLength?this.props.minutes:this.state.minutes,c=this.props.inputValueLength?this.props.hours:this.state.hours,r=f(this.props.isCountDown,o,i,c),l=function(e,t,n,a){var s={onClick:h(e,t,n,a)};return e?t?(s.text="Continue",s.className="successButton animateToLeft"):(s.text="Pause",s.className="warningButton animateToLeft"):(s.text="Start",s.className="".concat(a?"notAllow":"startButton")),s}(n,a,this.clockMethods,r),u={ref:function(t){return e.startAndPauseButton=t}};return l=Object.assign(l,u),s.a.createElement("div",{id:this.props.ariaIdForContainer,"aria-labelledby":this.props.ariaIdForContainer,role:"tabpanel"},s.a.createElement("div",{role:"timer",className:"clockContainer"},s.a.createElement(O,{seconds:o,minutes:i,hours:c,isCountDown:this.props.isCountDown,spanToBorder:this.props.numberClicked,focusOnInput:this.props.focusOnInput,inputValueLength:this.props.inputValueLength,handleClockEvents:this.props.handleClockEvents,setPositionOfCursorInInput:this.props.setPositionOfCursorInInput}),this.props.children,s.a.createElement(p,{hoursDisplayed:this.props.hoursDisplayedInClock.value})),s.a.createElement(N,{firstButton:l,secondButton:{onClick:this.stopClock,text:"Reset",className:"dangerButton ".concat(n?"animateToRight":"hideBtn")}}))}}]),n}(s.a.Component);T.defaultProps={seconds:0,minutes:5,hours:0,isCountDown:!1,focusOnInput:!1};var w=T,B=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;Object(r.a)(this,n),(a=t.call(this,e)).onInputChange=function(e){if(function(e){if("."===e[e.length-1])return!1;var t=Number(e);return!Number.isNaN(t)&&!!Number.isInteger(t)}(e.target.value)){var t=e.target.value.toString();if(t){var n={seconds:(t[t.length-2]||0)+(t[t.length-1]||0),minutes:(t[t.length-4]||0)+(t[t.length-3]||0),hours:(t[t.length-6]||0)+(t[t.length-5]||0)},s=t.length>=7?t.slice(t.length-6,t.length):t;a.setState({inputValue:s,inputSeconds:+n.seconds,inputMinutes:+n.minutes,inputHours:+n.hours})}else a.setState({inputValue:"",inputSeconds:0,inputMinutes:0,inputHours:0})}},a.changeTimerNumbers=function(){var e=a.state,t=C(e.inputSeconds,e.inputMinutes,e.inputHours),n=t.seconds,s=t.minutes,o=t.hours;a.setState({inputSeconds:n,inputMinutes:s,inputHours:o})},a.handleOnInputFocus=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:!a.state.focusOnInput;e||a.changeTimerNumbers(),e||document.activeElement!==a.inputClockRef.current||a.inputClockRef.current.blur(),a.setState({focusOnInput:e,inputValue:""})},a.setPositionOfCursorInInput=function(e){if(a.state.inputValue.length){var t=a.state.inputValue.length-e;a.inputClockRef.current.setSelectionRange(t,t)}},a.handleOnBlur=function(){document.activeElement!==a.inputClockRef.current&&(a.state.clickedInClockContainer?a.setState({clickedInClockContainer:!1}):(a.handleOnInputFocus(!1),a.setState({numberClicked:null})))},a.handleOnFocus=function(){if(!a.state.focusOnInput)return a.handleOnInputFocus(!0),void a.inputClockRef.current.focus()},a.handleOnMouseDown=function(){a.state.clickedInClockContainer||a.setState({clickedInClockContainer:!0})},a.handleOnClick=function(e){"SPAN"===e.target.nodeName&&a.setState({numberClicked:e.target}),a.state.focusOnInput||a.handleOnInputFocus(!0),a.inputClockRef.current.focus(),a.setState({clickedInClockContainer:!1})},a.handleClockEvents=function(e){var t,n={blur:a.handleOnBlur,click:a.handleOnClick,focus:a.handleOnFocus,mousedown:a.handleOnMouseDown};return(t=e.type,n[t])(e)},a.inputClockRef=s.a.createRef();var o=a.props,i=o.seconds,c=o.minutes,l=o.hours;return a.state={inputValue:"",focusOnInput:!1,inputSeconds:i,inputMinutes:c,inputHours:l,clickedInClockContainer:!1,numberClicked:null},a}return Object(l.a)(n,[{key:"render",value:function(){var e=this.state,t=e.focusOnInput,n=e.inputValue,a=e.inputHours,o=e.inputMinutes,i=e.inputSeconds,c=e.numberClicked;return s.a.createElement(w,{hours:a,minutes:o,seconds:i,isCountDown:!0,numberClicked:c,focusOnInput:t,inputValueLength:n.length,handleClockEvents:this.handleClockEvents,handleOnInputFocus:this.handleOnInputFocus,bellStarting:this.props.bellStarting,keyPressed:this.props.keyPressed,setPositionOfCursorInInput:this.setPositionOfCursorInInput,setHoursInClock:this.props.setHoursInClock,hoursDisplayedInClock:this.props.hoursDisplayedInClock,timeInactivity:this.props.timeInactivity,ariaIdForContainer:this.props.ariaIdForContainer},s.a.createElement("input",{tabIndex:1,ref:this.inputClockRef,onBlur:this.handleClockEvents,onFocus:this.handleClockEvents,inputMode:"numeric",type:"text",onChange:this.onInputChange,className:"hiddenInput",value:n}))}}]),n}(s.a.Component),M=(n(79),n(49),function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(r.a)(this,n),(a=t.call(this,e)).closeModalOnKeyPress=function(e){switch(a.props.stopKeyEventPropagation&&e.nativeEvent.stopImmediatePropagation(),e.key){case"Escape":return a.props.closeModal(e);case"Enter":return a.props.closeSuccessModal(e)}},a.divToFocus=null,a.setDivFocus=function(e){a.divToFocus=e},a.focusDiv=function(){a.divToFocus.focus()},a}return Object(l.a)(n,[{key:"componentDidUpdate",value:function(e){this.props.modalState&&e.modalState!==this.props.modalState&&this.focusDiv()}},{key:"render",value:function(){var e=this,t=this.props,n=t.modalState,a=t.children,o=t.title,i=t.modalValidation;return s.a.createElement("div",{role:"dialog","aria-labelledby":"modalDialogTitle","aria-describedby":"bellsDialog",ref:this.setDivFocus,tabIndex:1,className:"globalAlert modalEffect ".concat(n?"showModal":""," ").concat(i?"":"invalidModal"),onKeyDown:function(t){return e.closeModalOnKeyPress(t)}},s.a.createElement("div",{className:"modalContent"},s.a.createElement("div",{className:"modalTitleContainer"},s.a.createElement("h2",{id:"modalDialogTitle",className:"modalTitle"},o)),a))}}]),n}(a.Component));M.defaultProps={title:"Modal",modalState:!1,modalValidation:!0};var D=M,P=n(50),R=n.n(P),x=n(51),V=n.n(x),L=n(52),j=n.n(L),F=n(53),A=n.n(F),H=n(54),K=n.n(H),U=n(55),z=n.n(U),G=n(56),J=n.n(G),W=n(57),Y=n.n(W),Z=[{name:"Long Bell",src:R.a},{name:"Bowl Struck",src:V.a},{name:"Japanese Gong",src:j.a},{name:"Buddhist Prayer Bell",src:A.a},{name:"Burmese Gong",src:K.a},{name:"Chinese Gong",src:z.a},{name:"Tingsha Bell",src:J.a},{name:"Zen Bell",src:Y.a}],q=n(130),Q=n(122),X=n(131),$=n(127),_=n(133),ee=n(128),te=function(e){return e>60&&e%5!==0||e>90&&e%10!==0||e>120&&e%30!==0},ne=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;Object(r.a)(this,n),(a=t.call(this,e)).handleSelectAudiosChange=function(e){return a.setState({selectAudiosValue:e.target.value})},a.handleInputChange=function(e,t){e&&a.setState({autoCompleteInputValue:t})},a.startAudioBellFromBeginning=function(){a.bellRef.currentTime=0,a.bellRef.play()},a.closeSuccessModal=function(){return a.props.closeModal()},a.closeModal=function(e){return a.props.closeModal(e,!1)};var s=1===a.props.ringBellEvery?"".concat(a.props.ringBellEvery," minute"):"".concat(a.props.ringBellEvery," minutes");return a.state={selectAudiosValue:"Long Bell",autoCompleteInputValue:s},a}return Object(l.a)(n,[{key:"componentDidUpdate",value:function(e){!1===e.bellStarting&&!0===this.props.bellStarting&&this.startAudioBellFromBeginning()}},{key:"render",value:function(){var e=this,t=this.state,n=t.autoCompleteInputValue,a=t.selectAudiosValue,o=Z.sort((function(e,t){return n=e.name,a=t.name,n>a?1:n<a?-1:0;var n,a})).map((function(e,t){var n=e.name;return s.a.createElement(q.a,{key:t,value:n}," ",n," ")})),i=Z.find((function(e){return e.name===a})).src,c=function(e,t){for(var n=[],a=function(e,t){var n="minute",a=function(e,t){return"".concat(e," ").concat(function(e,t){return 1===e?t:"".concat(t,"s")}(e,t))},s=a(t,"hour"),o=a(e,n);return t?e?"".concat(s," ").concat(o):s:o},s=1;s<=e;s++){if(!t(s)){var o=a(s%60,parseInt(s/60));n.push({label:o,value:s})}}return n}(360,te);return s.a.createElement(D,{title:"Settings",modalState:this.props.modalState,closeModal:this.closeModal,closeSuccessModal:this.closeSuccessModal,stopKeyEventPropagation:this.props.stopKeyEventPropagation},s.a.createElement("div",{className:"audioSelection"},s.a.createElement(Q.a,null,s.a.createElement(X.a,{id:"simple-select-label"},"Bells"),s.a.createElement($.a,{labelId:"simple-select-label",id:"simple-select",value:this.state.selectAudiosValue,onChange:this.handleSelectAudiosChange},o))),s.a.createElement("figure",{className:"reproduceAudio"},s.a.createElement("figcaption",null,"Reproduce Bell"),s.a.createElement("audio",{ref:function(t){return e.bellRef=t},src:i,controls:!0},"Your browser does not support the",s.a.createElement("code",null,"audio")," element.")),s.a.createElement("div",{className:"inputContainer ".concat(this.props.showTimer?"hide":"")},s.a.createElement(ee.a,{id:"combo-box",options:c,getOptionSelected:function(e,t){var n=t.value;return e.value===n},getOptionLabel:function(e){return e.label},onChange:this.props.handleMinutesSelect,onInputChange:function(t,n){return e.handleInputChange(t,n)},inputValue:n,handleHomeEndKeys:!0,filterSelectedOptions:!0,fullWidth:!0,renderInput:function(e){return s.a.createElement(_.a,Object.assign({},e,{label:"Ring every",variant:"outlined"}))}})),s.a.createElement("div",{className:"buttonsInModalContainer"},s.a.createElement("button",{className:"alertButton buttonsInModal ".concat(this.props.showTimer?"hide":""),onClick:function(t){return e.closeModal(t,!1)}},"Cancel"),s.a.createElement("button",{className:"successButton buttonsInModal",onClick:this.closeSuccessModal},"Save changes")))}}]),n}(a.Component);function ae(e){for(var t=e.classNames,n=e.handleClick,a=e.buttonsText,o=e.amountOfButtons,i=e.activeTab,c=[],r=function(e){var o=a[e]?a[e]:"Button";c.push(s.a.createElement("button",{key:e,tabIndex:0,role:"tab","aria-selected":i===e,"aria-controls":"clock".concat(e+1),className:"buttons ".concat(t.button?t.button:""," ").concat(t.buttons[e]?t.buttons[e]:""),onClick:function(){return n(e)}},o))},l=0;l<o;l++)r(l);return s.a.createElement("div",{role:"tablist","aria-label":"Clocks tablist",className:"btnsContainer ".concat(t.container?t.container:"")},c)}ae.defaultProps={amountOfButtons:2,classNames:{container:"",button:"",buttons:[""]}};var se=ae,oe=n(64),ie=n.n(oe);var ce=function(e){var t=e.showTimer,n=e.numberToRing,a=e.handleModal;return s.a.createElement("div",{className:"belowClockContainer"},s.a.createElement("span",{className:"belowClockContainerInfo ".concat(t?"hidden":"")},"Ring every ",n," ",1===n?"minute":"minutes"),s.a.createElement("div",{className:"settingsContainer"},s.a.createElement("button",{className:"settingsLogoBtn",onClick:a},s.a.createElement("figure",null,s.a.createElement("img",{src:ie.a,className:"settingsLogo",alt:"Settings Logo",height:"20",width:"20"}))),s.a.createElement("span",{className:"tooltip"},"Settings")))};function re(e){var t=e.onClick,n=e.classNames,a=void 0===n?{}:n,o=e.buttonText;return s.a.createElement("div",{className:"sizeAppButtonContainer ".concat(a.container,"}")},s.a.createElement("button",{onClick:t,className:"".concat(a.button)},o))}re.defaultProps={buttonText:"Change Size Button",classNames:{container:"",button:""}};var le=re,ue=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;Object(r.a)(this,n),(a=t.call(this,e)).handleClockBtns=function(e){return a.setState({activeTab:e})},a.handleModal=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=a.state,s=n.modalClicked,o=n.modalSelectValue;(!t&&s||s&&""===o)&&a.setState({modalSelectValue:a.state.numberToRing}),a.setState({modalClicked:!s,showingOverlay:!a.state.showingOverlay})},a.setAppInBigSize=function(){a.setState({showAppInBig:!a.state.showAppInBig})},a.setHoursInClock=function(e,t){return a.setState(Object(c.a)({},e,t))},a.bellStarting=function(){return a.setState({bellStarting:!0})},a.onBodyKeydown=function(e){var t=e.key;return a.setState({keyPressed:t})},a.handleModalSelect=function(e,t){var n=t?t.value:"";a.setState({modalSelectValue:n})},a.handleVisibilityChange=function(e){var t=(e||{}).timeStamp,n=a.state.timeOfTabInactivity,s=n.start;if(n.isTabActive)a.setState({timeOfTabInactivity:{start:t,inactivityInSeconds:null,isTabActive:!1}});else{var o=v((t-s)/1e3);a.setState({timeOfTabInactivity:{start:null,inactivityInSeconds:o,isTabActive:!0}})}},a.mainContainerRef=s.a.createRef();return a.state={activeTab:0,keyPressedEvent:null,bellStarting:!1,timeOfTabInactivity:{start:null,inactivityInSeconds:null,isTabActive:!0},isTimerShowingHours:!1,isStopwatchShowingHours:!1,modalClicked:!1,modalSelectValue:2,showingOverlay:!1,numberToRing:2,showAppInBig:!1},a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){document.addEventListener("keydown",this.onBodyKeydown),document.addEventListener("visibilitychange",this.handleVisibilityChange)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.onBodyKeydown),document.removeEventListener("visibilitychange",this.handleVisibilityChange)}},{key:"componentDidUpdate",value:function(e,t){var n=this.state,a=n.modalClicked,s=n.modalSelectValue;this.state.keyPressed&&this.setState({keyPressed:null}),this.state.bellStarting&&this.setState({bellStarting:!1}),t.modalClicked&&!a&&this.setState({numberToRing:+s})}},{key:"render",value:function(){var e=this,t=this.state,n=t.activeTab,a=t.keyPressed,o=t.bellStarting,i=t.numberToRing,c=t.isTimerShowingHours,r=t.isStopwatchShowingHours,l=t.showingOverlay,u=t.modalClicked,d=t.modalSelectValue,p=t.showAppInBig,m=t.timeOfTabInactivity,h=!n,f=function(t){return{setHoursInClock:function(t,n){return e.setHoursInClock(t,n)},stateName:t?"isTimerShowingHours":"isStopwatchShowingHours",value:t?c:r}},v={container:h&&c||!h&&r?"hoursInClock":"",buttons:[]};return v.buttons[n]="btnSelected",s.a.createElement("div",{className:"mainContainer ".concat(p?"bigScreenMode":"")},s.a.createElement("div",{onClick:this.handleModal,className:"modalOverlay ".concat(l?"showOverlay":"")}),s.a.createElement(ne,{stopKeyEventPropagation:!0,bellStarting:o,closeModal:this.handleModal,modalState:u,ringBellEvery:d,handleMinutesSelect:this.handleModalSelect,showTimer:h}),s.a.createElement("div",{className:"appContainer"},s.a.createElement(le,{onClick:this.setAppInBigSize,buttonText:p?"Make it Small":"Make it Big!"}),s.a.createElement("main",{className:"appSubContainer"},s.a.createElement(se,{activeTab:n,handleClick:this.handleClockBtns,amountOfButtons:2,buttonsText:["Timer","Stopwatch"],classNames:v}),s.a.createElement("section",null,s.a.createElement("div",{className:"clock"},s.a.createElement("div",{className:"".concat(h?"":"hide")},s.a.createElement(B,{keyPressed:h?a:null,bellStarting:this.bellStarting,hours:0,minutes:10,seconds:0,hoursDisplayedInClock:f(!0),timeInactivity:m,ariaIdForContainer:"Clock 1"})),s.a.createElement("div",{className:"".concat(h?"hide":"")},s.a.createElement(w,{keyPressed:h?null:a,bellStarting:this.bellStarting,hours:0,minutes:0,seconds:0,ringEvery:i,hoursDisplayedInClock:f(!1),timeInactivity:m,ariaIdForContainer:"Clock 2"})))),s.a.createElement(ce,{showTimer:h,numberToRing:i,handleModal:this.handleModal}))),s.a.createElement("footer",null,s.a.createElement("span",null,"Logos taken by\xa0",s.a.createElement("a",{href:"https://fontawesome.com/license"},"Font Awesome"),"\xa0and\xa0",s.a.createElement("a",{href:"https://icons8.com/"},"Icons 8"))))}}]),n}(s.a.Component);i.a.render(s.a.createElement(ue,null),document.getElementById("root"))}},[[73,1,2]]]);
//# sourceMappingURL=main.0c013c5a.chunk.js.map