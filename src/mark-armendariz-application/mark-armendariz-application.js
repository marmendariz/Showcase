import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/legacy/polymer.dom';
import '@polymer/app-route/app-location';
import '@polymer/app-route/app-route';
import {} from '@polymer/polymer/lib/utils/resolve-url.js';
import {MaMenuBar} from '../app-components/page-components/ma-menu-bar/ma-menu-bar.js';
import {MaLandingPage} from '../app-components/page-components/ma-landing-page/ma-landing-page.js';
import {MaHomePage} from '../app-components/page-components/ma-home-page/ma-home-page.js';
import {MaSkillsPage} from '../app-components/page-components/ma-skills-page/ma-skills-page.js';
import {MaExperiencePage} from '../app-components/page-components/ma-experience-page/ma-experience-page.js';
import {MaProjectsPage} from '../app-components/page-components/ma-projects-page/ma-projects-page.js';
import {MaContactPage} from '../app-components/page-components/ma-contact-page/ma-contact-page.js';
import {MaEducationPage} from '../app-components/page-components/ma-education-page/ma-education-page.js';
import {MaAboutMe} from '../app-components/page-components/ma-about-me/ma-about-me.js';

class MarkArmendarizApplication extends PolymerElement {
 
  static get template() {
    return html`
      
      <style>
        :host {
          /*1c739b*/
          display: block;
          --ma-general-font-color: #404042;
          --ma-accent-font-color: #404042;
          --ma-suppress-font-color: #dcdcdc;
          --ma-main-theme-color: #0c4e8a;
          --ma-main-theme-color-lite: #2264A0;
          --ma-main-theme-color-lite-transparent: #2264a047;
          --ma-accent-color: #D57E04;
          color: var(--ma-general-font-color);
          --ma-subtitle-text:{
            color: var(--ma-main-theme-color);
            font-weight: bold;
            font-size: 15pt !important;
          }
        }        
        #landingPage{
          height: 100vh;
        }
        ma-menu-bar#menuBar{
          top: 0px;
          z-index: 1;
          --ma-menu-bar-position: relative;
        }
        ma-menu-bar#menuBar.sticky{
          position: fixed;
          width: 100%;
        }
        .sticky + #homePage {
         padding-top: 60px;
        }
        #contactPage{
          min-height: 600px;
        }

        .page{
          padding-left: 20% !important;
          padding-right: 20% !important;
        }

        @media (min-width: 1281px) {
          #homePage{
            padding-top: 20px;
          }
          .page{
            padding-top: 10px;
          }
          .page.home-page{
            padding-top: 10px;
            padding-bottom: 0;
          }
        }
        @media (min-width: 1025px) and (max-width: 1280px) {
          .page{
            padding-left: 15% !important;
            padding-right: 15% !important;
            padding-top: 10px;
            padding-bottom: 0px
          }
          .page.home-page{
            padding-top: 10px;
            padding-bottom: 60px;
          }
        }
        @media (min-width: 768px) and (max-width: 1024px) {
          .page{
            padding-top: 10px;
            padding-bottom: 0px;       
            padding-left: 10% !important;
            padding-right: 10% !important;
          }
          .page.home-page{
             padding-top: 10px;
            padding-bottom: 60px;
          }
        }
        @media (min-width: 481px) and (max-width: 1024px) {
          .page{
            padding-top: 10px;
            padding-bottom: 0px;  
            padding-left: 5% !important;
            padding-right: 5% !important;
          }
          #homePage{
            padding-top: 0px;
          }
          #educationPage, #skillsPage{
            width: 100% !important;
          }
          #educationPage{
            margin-bottom: 50px;
          }
        }
        @media (min-width: 320px) and (max-width: 480px) {
          .page{
            /* padding-top: 60px; */
            padding-bottom: 20px;
          }
          #homePage{
            padding-top: 0px;
          }
        }
        @media (max-width: 481px){
          #educationPage, #skillsPage{
            width: 100% !important;
          }
          .page{
            padding-left: 5% !important;
            padding-right: 5% !important;
          }
        }
        @media(max-width: 1024px){
          #skillsAndEducationPage{
            display: block !important;
          }
        }
        #educationPage{
          margin-right: 35px;
        }
        #educationPage, #skillsPage{
          width: 50%;
        }
        footer{
          background-color: var(--ma-main-theme-color);
          padding: 20px 50px;
          height: 46px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 9pt;
          color: white;
        }
        footer #footer-logo{
          background-image:url('icon-inverted.png');
          height: 38px;
          width: 29px;
          background-size: cover;
          background-repeat: no-repeat;
        }

        #projectsPage{
          margin-top: 20px;
        }
      </style>
  
      <ma-landing-page id="landingPage"
                       title="Home">
      </ma-landing-page>
      
      <div id="appPages">
        <ma-menu-bar id="menuBar" 
                     selected-page={{selectedPage}}
                     pages={{appPages}}
                     name-line-one="Mark"
                     name-line-two="Armendariz">
        </ma-menu-bar>

        <ma-home-page id="homePage"
                      class="page home-page"
                      title="Hi, I'm Mark"
                      data=[[homePageData]]>
        </ma-home-page>
        
        <ma-about-me id="aboutMePage"
                     class="page"
                     data=[[homePageData]]
                     title="About me">
        </ma-about-me>

        <div class="page" id="skillsAndEducationPage" style="display: flex;">
          <ma-education-page id="educationPage"
                            style="margin-right: 35px;"
                            title="Education"
                            data=[[educationData]]>
          </ma-education-page>
          <ma-skills-page id="skillsPage"
                          title="Skills"
                          data="[[skillsData]]"
                          other-data=[[otherSkillsData]]>
          </ma-skills-page>
        </div>
        
        <ma-experience-page id="experiencePage"
                            class="page"
                            title="Experience"
                            data=[[experienceData]]>
        </ma-experience-page>

        <ma-projects-page id="projectsPage"
                          class="page"
                          title="Projects"
                          data=[[projectsData]]
                          url=[[projectsSiteUrl]]>
        </ma-projects-page>
        
        <ma-contact-page id="contactPage"
                         class="page" 
                         title="Contact"
                         data=[[contactData]]>
        </ma-contact-page>
      </div>

      <footer>
        <div>Copyright &copy; 2021 Mark Armendariz. All rights reserved.</div>
        <div id="footer-logo"></div>
      </footer>
    `;
  }

  
  static get properties() {
    return {
      appPages: {
        type: Array
      },
      appTitle: {
        type: String
      },
      selectedPage: {
        type: Object,
        notify: true,
        observer: "_pageChanged"
      },
      homePageData:{
        type: Object,
      },
      skillsData:{
        type: Array
      },
      otherSkillsData:{
        type: Array
      },
      experienceData:{
        type: Array
      },
      projectsData:{
        type: Array
      },
      projectsSiteUrl:{
        type: String
      },
      educationData:{
        type: Object
      }
    };
  }

  ready(){
    super.ready();
    this._getResumeData();
    
    window.addEventListener("scroll", function(e){
      this._resolveMenubarStickiness();
    }.bind(this));
  }

  _resolveMenubarStickiness(){
    var menuBar = this.$.menuBar;
    var menuBarOffset = menuBar.offsetTop;
    var homePageDist = this.$.homePage.getBoundingClientRect().top;

    if (window.pageYOffset >= menuBarOffset) {
      menuBar.classList.add("sticky");
    } 
    if(homePageDist >= menuBarOffset){
      menuBar.classList.remove("sticky");
    }
  }

  _getResumeData() {
    this._getResource( {
        url: this.resolveUrl('src/data/resume-data.json'),
        onLoad(e){
            var data = JSON.parse(e.target.responseText).d.result;
            this.appTitle = data.appTitle;
            this.appPages = data.appPages;
            this.homePageData = data.homePageData;
            this.skillsData = data.skillsData;
            this.otherSkillsData = data.otherSkillsData;
            this.experienceData = data.experienceData;
            this.projectsData = data.projectsData;
            this.educationData = data.educationData;
            this.projectsSiteUrl = data.projectsSiteUrl;
        }
     })
  }

  connectedCallback(){
    super.connectedCallback();
    this.addEventListener('homeEnterTap', e => this._handleHomeButtonClick(e));
  }

  _getResource(rq) {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('load', rq.onLoad.bind(this));
    xhr.open('GET', rq.url);
    xhr.send();
  }

  _handleHomeButtonClick(e){
    this.$.homePage.scrollIntoView({block: "start", behavior: "smooth"});
  }

  _pageChanged(val){
    var element = this.$.appPages.querySelector("#"+val.page);
    if(element){
      this.$.appPages.querySelector("#"+val.page).scrollIntoView({block: "start", behavior: "smooth"});
    }
  }

}

window.customElements.define('mark-armendariz-application', MarkArmendarizApplication);
