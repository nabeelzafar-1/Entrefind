import React, {Component} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import ScreenWrapper from './../components/ScreenWrapper';
import Header from './../components/Header';
import ProjectsListItem from './../components/ProjectsListItem';

import image1 from '../assets/thumbnails/1.jpg';
import image2 from '../assets/thumbnails/2.jpg';
import image3 from '../assets/thumbnails/3.jpg';
import image4 from '../assets/thumbnails/4.jpg';
import image5 from '../assets/thumbnails/5.jpg';

class ProjectsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectsList: [
        {
          id: 1,
          title: 'Project Title',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
          video: image1,
        },
        {
          id: 2,
          title: 'Project Title',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
          video: image2,
        },
        {
          id: 3,
          title: 'Project Title',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
          video: image3,
        },
        {
          id: 4,
          title: 'Project Title',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
          video: image4,
        },
        {
          id: 5,
          title: 'Project Title',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
          video: image5,
        },
      ],
    };
  }

  _onDotPress = (itemId) => {
    const {projectsList} = this.state;
    const item = projectsList.find((element) => element.id === itemId);
    this.props.navigation.navigate('AddProject', {item: item, isEdit: true});
  };
  render() {
    const {projectsList} = this.state;
    return (
      <ScreenWrapper>
        <View style={styles.container}>
          <Header
            title="PROJECTS"
            onAddPress={() => {
              this.props.navigation.navigate('AddProject', {isEdit: false});
            }}
          />
          <View style={styles.listContainer}>
            <FlatList
              keyExtractor={(item, index) => item.id.toString()}
              data={projectsList}
              renderItem={({item}) => (
                <ProjectsListItem item={item} onDotPress={this._onDotPress} />
              )}
            />
          </View>
        </View>
      </ScreenWrapper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
    marginTop: 10,
    width: '100%',
  },
});
export default ProjectsScreen;
