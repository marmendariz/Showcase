
import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {ScCard} from '../../sc-card/sc-card.js';
import {} from '@polymer/polymer/lib/elements/dom-repeat';
import {ScResumeEntry} from '../sc-resume-entry/sc-resume-entry.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@webcomponents/shadycss/entrypoints/apply-shim.js';

/**
 * @customElement
 * @polymer
 */


export class ScExperiencePage extends PolymerElement {
  
  static get template() {
    return html`
      <style>
        :host {
          position: relative;
          display: block;
          /*padding: var(--sc-page-padding, 0px);*/
          background-color: var(--sc-page-background-color ,white);
          height: 100%;
        }
        div[slot="subtitle"]{
          color: #0c4e8a;
          font-weight: bold;
          font-size: 15pt;
        }



        sc-card.selected{
          --sc-card-background-color : #404042;
          --sc-card-style:{
            color: var(--sc-accent-font-color);
          }
        }
        sc-card.ignore{
          --sc-card-style:{
            color: var(--sc-suppress-font-color);
          }
        }


        
        #pageContent{
          display: flex;
          height: 76vh;
          position: relative;
        }
        #pageTitleCard{
          margin-bottom: 20px;
        }

        #jobsContainer{
          margin: 0px 10px 0px 0px;
          display: table;
          table-layout: fixed;
          width: 45%;
          height: 100%;
          
          /*--sc-card-frame:{
            height: 100%;
          }*/
        }
        .jobCard{
          display: table-row;
          height: auto;
          cursor: pointer;
          --sc-card-frame:{
            margin-bottom: 10px;
          }
        }
        #jobDetailsContainer{
          width: 55%;
          margin: 0px 0px 0px 10px;
          display: table;
          height: 100%;
        }
        #jobDetailsCard{
          display: table-row;
          height: 100%;
          font-size: 10pt;
          /*--sc-card-frame:{
            height: 93%;
          }*/
        }

        /**************************/

        .jobCard>div[slot="content"]{
          line-height: 15px;
        }
        /*
        .jobCard:hover{
          box-shadow: var(--sc-card-box-shadow, 10px 10px 47px 20px #55555557);
          transform: translate(-1%, -2%);
        }*/




        /*********************/
        li{
          line-height: 22px;
        }
        ul{
          padding-left: 24px;
        }
        .companyName{
          font-size: 14pt;
        }
        .positionName{
          font-size: 10pt;
        }
        .companyName, .positionName{
          line-height: 4px;
          font-weight: bold;
        }
        .dateRange{
          margin-top: 20px;
        }
        .dateRange, .location{
          line-height: 5px;
          font-size: 10pt;
        }
        /*********************/


        /*****************************************/
        @media screen and (max-width: 900px){
          .companyName{
            font-size: 11pt;
          }
          .positionName{
            font-size: 9pt;
          }
          .location{
            display: none;
          }

        }
        /*****************************************/




        /*****************************************/
        /* SMALLER RESOLUTION STYLES */
        @media screen and (max-width: 600px){
          li{
           line-height: 27px;
          }
          ul{
            font-size: 9pt;
          }


          #jobsContainer{
            table-layout: unset;
          }
          .jobCard{
            display: block;
            --sc-card-frame:{
              height: 150px;
           }
          }


          .companyName, .positionName{
            line-height: 15px
          }
          .dateRange{
            line-height: 15px;
            margin-top: 10px;
          }

          #pageContent{
            display: block;
          }

          .jobCard>div[slot="content"]{
             height: 115px;
          }
          #jobDetailsCard>div[slot="content"]{
            width: 100%;
          }
          #jobsContainer{
            width: 100%;
            display: flex;
            justify-content: space-between;
            height:100%;
          }

          .jobCard{
            width: 100%;
            /*--sc-card-padding: 10px;*/
            margin: 10px 2px;
          }
          #jobDetailsCard, #jobDetailsContainer{
            margin: 0px 0px;
            width: 100%;
          }
          
        }
        /*****************************************/



      </style>

<div>
        <sc-card id="pageTitleCard" class="">
          <div slot="title"><h1>{{_toLowerCase(title)}}</h1></div>
          <div slot="subtitle">[[subtitle]]</div>
        </sc-card>
      
        <div id="pageContent">


            <div id="jobsContainer">
            <dom-repeat id="repeat" items="{{data}}" as="section">
              <template>
                <sc-card id="[[section.id]]" class="jobCard" on-click="_setAsSelected">
                  <div slot="content">
                    <p class="companyName">[[section.companyName]]</p>
                    <p class="positionName">[[section.positionName]]</p>
                    <p class="dateRange">[[section.startDate]] - [[section.endDate]]</p>
                    <p class="location">[[section.city]], [[section.state]]</p>
                  </div>
                </sc-card>
              </template>
            </dom-repeat>
            </div>

            <div id="jobDetailsContainer">
              <sc-card id="jobDetailsCard">
                <div slot="content">
                    <ul>
                      <dom-repeat id="repeat" items="[[_selectedData]]">
                        <template>
                            <li>[[item]]</li>
                        </template>
                      </dom-repeat>
                    </ul>
                </div>
              </sc-card>
            </div>


        </div>

  </div>

    `;
  }


  static get properties() {
    return {
      /**
       * Title of Resume Section
       */
      title:{
        type: String,
        reflectToAttribute: true
      },

      pageId: {
        type: String,
        reflectToAttribute: true
      },

      subtitle:{
        type: String,
        reflectToAttribute: true
      },

      isGeneralType:{
        type: Boolean,
        value: false,
      },

      data:{
        type: Object,
        observer: "_test",
        notify: true,
      },

      _selectedData:{
        type: Array
      },

      defaultDetailsMessage: {
        type: String,
        value: "Select an experience card for more details!"
      }
    };
  }

  ready(){
    super.ready();
    //this._selectedData = this.data[0].points;
  }

  _test(data){
    console.log(data);
  }

  _setAsSelected(e){
    var targetElement;
    var selectedClass = "selected";
    var targetElementName = "SC-CARD";

    if(e.target.tagName == targetElementName){
      targetElement = e.target;
    }
    else{
      var tempElement = e.target;
      while(tempElement.tagName != targetElementName){
        tempElement = tempElement.parentElement;
      }
      targetElement = tempElement;
    }
    if(targetElement.classList.contains(selectedClass)){
      targetElement.classList.remove(selectedClass);
      this._removeClassByName("ignore", targetElementName.toLowerCase());
    }
    else{
      this._removeClassByName(selectedClass, targetElementName.toLowerCase());
      targetElement.classList.add(selectedClass);
      targetElement.classList.remove("ignore");
      this._suppressNonSelectedjobCards();
    }
    this.updateStyles();

    this._selectedData = this.data[parseInt(targetElement.id)-1].points;

  }

  _suppressNonSelectedjobCards(){
    var selectedElements = this.shadowRoot.querySelectorAll(".jobCard");
    for(var element of selectedElements){
      if(!element.classList.contains("selected")){
        element.classList.add("ignore");
      }
    }
    this.updateStyles();

  }

  _removeClassByName(className, tagName){
    var queryString = tagName + "." + className;
    var selectedElements = this.shadowRoot.querySelectorAll(queryString);
    for(var element of selectedElements){
      element.classList.remove(className);
    }
    this.updateStyles();
  }

  /**
   * 
   * @param {*} sectionId 
   */
  _getPageData(sectionId){
    return this.data[parseInt(sectionId)].jobs;
  }

  /**
   * Utility method for converting text to lowercase
   * @param {*} title 
   */
  _toLowerCase(text){
    return text.toLowerCase();
  }

  /**
   * 
   * @param {*} businessName 
   * @param {*} positionName 
   */
  _formatBusinessAndPosition(businessName, positionName){
    var returnString = "";
    if(businessName && !positionName){
      returnString = businessName;
    }
    else if(businessName && positionName){
      returnString = businessName + " - " + positionName;
    }
    return returnString;
  }


}

window.customElements.define('sc-experience-page', ScExperiencePage);
