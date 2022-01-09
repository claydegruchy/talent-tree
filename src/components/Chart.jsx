import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

import { useState, useEffect } from 'react';

import COSEBilkent from 'cytoscape-cose-bilkent';
import cola from 'cytoscape-cola';
import klay from 'cytoscape-klay';
import cise from 'cytoscape-cise';
import CytoscapeComponent from 'react-cytoscapejs';
import Cytoscape from 'cytoscape';

import { parseCourseData } from './Courses';
import { ChartStyle, exportLayout } from './ChartStyle';

Cytoscape.use(cise);
Cytoscape.use(cola);
Cytoscape.use(COSEBilkent);
Cytoscape.use(klay);

var layout = {
  name: 'cose-bilkent',
  // name: 'cola',
  // name: 'cise',
  // name: 'klay',
  ...exportLayout,
};

const Chart = ({ search }) => {
  return (
    <CytoscapeComponent
      cy={(cy) => {
        cy.ready(function (event) {
          
          cy.nodes('.found').removeClass('found');
          if (!search) return;
          var lowSearch = search.toLowerCase();
          console.log({ lowSearch });
          if (lowSearch.length < 1) return;
          var found = cy
            .nodes()
            .filter(function (ele, i, eles) {
              var t = ele.data('title');
              if (t.toLowerCase().includes(lowSearch)) {
                console.log(t);
                return ele;
              }
            })
            .addClass('found');
          cy.fit(found,50);
        });

        // system to show relations when selected
        cy.on('select', 'node', function (event) {
          console.log(this.data('id'), this.data('com'));
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
          //unselected event
          // console.log(this.data('courseCode'))

          // SF1624?l=en
          var newURL = `https://www.kth.se/student/kurser/kurs/${this.data(
            'courseCode'
          )}?l=en`;
          // var newURL=`https://api.kth.se/api/kopps/v2/course/${this.data('courseCode')}/detailedinformation?l=en`
          console.log(newURL);
          window.open(newURL, '_blank').focus();
        });
      }}
      zoom={2}
      style={{
        width: '100%',
        height: '99vh',
      }}
      minZoom={0.2}
      maxZoom={5}
      elements={CytoscapeComponent.normalizeElements(parseCourseData())}
      layout={layout}
      stylesheet={ChartStyle}
    />
  );
};

export { Chart };
