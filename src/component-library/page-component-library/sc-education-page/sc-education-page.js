
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


export class ScEducationPage extends PolymerElement {
  
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          padding: var(--sc-page-padding, 0px);
          background-color: var(--sc-page-background-color ,white);
        }
        #contentSlot{
          @apply --sc-resume-page-style;
        }
        .centeredCard{
          position: relative;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%);
        }
      </style>

      <sc-card class="centeredCard">

        <div id="titleSlot" slot="title"><h1>{{_toLowerCase(title)}}</h1></div>

        <div id="contentSlot" slot="content">
          <!-- START -->
          <dom-repeat id="repeat" items="{{resumeSectionData}}" as="section">
            <template>

                <p>{{_formatBusinessAndPosition(section.companyName, section.positionName)}}</p>
                <ul>
                  <dom-repeat id="repeat2" items="{{section.points}}">
                    <template>
                        <li>{{item}}</li>
                    </template>
                  </dom-repeat>
                </ul>
                
            </template>
          </dom-repeat>
          <!-- END -->
        </div>

      </sc-card>

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



      isGeneralType:{
        type: Boolean,
        value: false,
      },
      
      /**
       * TODO: Replace with web service response
       */
      resumeSectionData:{
        type: Object,
        observer: "_test",
        notify: true,
      }
    };
  }

  _test(data){
    console.log(data);
  }

  /**
   * 
   * @param {*} sectionId 
   */
  _getPageData(sectionId){
    return this.resumeSectionData[parseInt(sectionId)].entries;
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

window.customElements.define('sc-education-page', ScEducationPage);
