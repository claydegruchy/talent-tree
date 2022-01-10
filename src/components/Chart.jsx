import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

import { useState, useEffect } from 'react';

import CytoscapeComponent from 'react-cytoscapejs';
import Cytoscape from 'cytoscape';

import { parseCourseData } from './Courses';
import { ChartStyle, exportLayout } from './ChartStyle';

import COSEBilkent from 'cytoscape-cose-bilkent';
import cola from 'cytoscape-cola';
import klay from 'cytoscape-klay';
import cise from 'cytoscape-cise';
import fcose from 'cytoscape-fcose';
import euler from 'cytoscape-euler';

Cytoscape.use(euler);
Cytoscape.use(fcose);
Cytoscape.use(cise);
Cytoscape.use(cola);
Cytoscape.use(COSEBilkent);
Cytoscape.use(klay);

var layout = {
  name: 'cose-bilkent',
  // name: 'cola',
  // name: 'cise',
  // name: 'fcose',
  // name: 'euler',
  // name: 'klay',
  ...exportLayout,
};

var last = '';

const Chart = ({ search, layoutSelection }) => {
  return (
    <CytoscapeComponent
      cy={(cy) => {
        cy.ready(function (event) {
          if (last != layoutSelection) {
            //   sl(layoutSelection);
            //   console.log({l,layoutSelection})
            last = layoutSelection;
            console.log({ layoutSelection, last });
            layout.name = layoutSelection;
            cy.layout(layout).run();
          }
          cy.nodes('.found').removeClass('found');
          if (!search) return;
          var lowSearch = search.toLowerCase();
          if (lowSearch.length < 1) return;
          var found = cy
            .nodes()
            .filter(function (ele, i, eles) {
              var t = ele.data('title');
              if (t.toLowerCase().includes(lowSearch)) {
                return ele;
              }
            })
            .addClass('found');
          cy.fit(found, 50);
        });

        // system to show relations when selected
        cy.on('select', 'node', function (event) {
          this.incomers().addClass('neighbor-selected incoming');
          this.outgoers().addClass('neighbor-selected outgoing');
          this.successors().addClass('neighbor-selected successor');
        });
        cy.on('unselect', 'node', function (event) {
          //unselected event
          this.incomers().removeClass('neighbor-selected incoming');
          this.outgoers().removeClass('neighbor-selected outgoing');
          this.successors().removeClass('neighbor-selected successor');
        });

        cy.on('dbltap', 'node', function (event) {
          var newURL = `https://www.kth.se/student/kurser/kurs/${this.data(
            'courseCode'
          )}?l=en`;
          window.open(newURL, '_blank').focus();
        });
      }}
      zoom={2}
      style={{
        width: '100%',
        height: '92vh',
      }}
      // minZoom={0.2}
      maxZoom={5}
      elements={CytoscapeComponent.normalizeElements(parseCourseData())}
      layout={layout}
      stylesheet={ChartStyle}
    />
  );
};

export { Chart };
