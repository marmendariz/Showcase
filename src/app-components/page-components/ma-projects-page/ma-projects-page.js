import { html, PolymerElement } from "../../../../node_modules/@polymer/polymer/polymer-element.js";
import { MaCard } from '../../util-components/ma-card/ma-card.js';
import "../../../../node_modules/@polymer/polymer/lib/elements/dom-repeat.js";
import "../../../../node_modules/@polymer/polymer/lib/elements/dom-if.js";
import "../../../../node_modules/@webcomponents/shadycss/entrypoints/apply-shim.js";
import '../ma-project-card/ma-project-card.js';
/**
 * @customElement
 * @polymer
 */

export class MaProjectsPage extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          padding: var(--ma-page-padding, 0px);
        }
        div[slot="subtitle"]{
          @apply --ma-subtitle-text;
        }
        #contentSlot{
          @apply --ma-resume-page-style;
        }
        ma-project-card{
          flex: 1;
          --ma-project-card-style:{
            height: 30vh;
            width: 120px;
          }
        }
        #projectCards{
          display: grid;
          grid-template-columns: 50% 50%;
          margin: 15px 0;
        }
        #projectCards .project-card{
          margin: 0 12px 24px 12px;
        }

        ma-card#comingSoonCard{
          margin-top: 40px;
        }
        h3#comingSoonMsg{
          text-align: center;
        }
        @media (min-width: 320px) and (max-width: 480px) {
          ma-project-card{
            margin-bottom: 20px;
            --ma-project-card-style:{
              height: 24vh;
              width: 120px;
            }
          }        
          ma-card#comingSoonCard{
            margin-top: 0px;
            margin-bottom: 10px;
          }
        }

        @media (max-width: 650px){
          #projectCards{
            display: block;
          }
          ma-project-card{
            --ma-project-card-style:{
              height: 20vh;
            }
          }
        }

        #project-title-card{
          --ma-card-background-image: none;
          --ma-card-background-color: none;
          --ma-card-box-shadow: none;
        }
      </style>

      <div class="centeredCard">
        <ma-card id="project-title-card">
          <div id="titleSlot" slot="title"><h1>{{_toLowerCase(title)}}</h1></div>
          <div slot="subtitle">[[subtitle]]</div>
        </ma-card>

        <div id="projectCards">
          <dom-repeat id="repeat" items="[[data]]">
            <template>
                <ma-project-card title=[[item.projectName]]
                                 class="project-card"
                                 icon-name=[[item.iconName]]
                                 image-name=[[item.projectImage]]
                                 start-date=[[item.startDate]]
                                 end-date=[[item.endDate]]
                                 technologies=[[item.technologies]]
                                 data=[[item.points]]>
                </ma-project-card>
            </template>
          </dom-repeat>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      /**
       * Title of Resume Section
       */
      title: {
        type: String,
        reflectToAttribute: true
      },
      subtitle: {
        type: String
      },
      data: {
        type: Array
      }
    };
  }
  /**
   * Utility method for converting text to lowercase
   * @param {*} title 
   */


  _toLowerCase(text) {
    return text.toLowerCase();
  }

}
window.customElements.define('ma-projects-page', MaProjectsPage);