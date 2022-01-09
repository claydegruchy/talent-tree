import data from './processed-courses.json';

const parseCourseData = () => {
  console.log('loading', data);

  const makeNode = (c) => ({
    // classes,
    data: {
      // ...c.course,
      id: c.course.courseCode,
      label: c.course.title || 'No name',
    },
  });

  const makeEdge = ({ courseCode, prereqCode }) => ({
    data: {
      weight: 1,
      source: courseCode,
      target: prereqCode,
    },
  });

  var nodes = [];
  var edges = [];

  for (var course of data) {
    nodes.push(makeNode(course));
  }

  for (var course of data) {
    var { prerequisiteCodes, courseCode } = course.course;

    if (prerequisiteCodes) {
      for (var prereqCode of prerequisiteCodes) {
        if (!data.find((c) => c.course.courseCode == prereqCode)) continue;
        if (courseCode == prereqCode) continue;
        edges.push(makeEdge({ courseCode, prereqCode }));
      }
    }
  }

  return { nodes, edges };
};

export { parseCourseData };
