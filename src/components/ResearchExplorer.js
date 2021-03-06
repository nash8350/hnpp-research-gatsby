import React from 'react';
import CitationsGroupedTable from '../components/CitationsGroupedTable';
import CitationsTable from '../components/CitationsTable';
import CitationFilter from '../components/CitationFilter';

export default class ResearchExplorer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        selectedTab: "Research papers",
        date: "",
        search: "",
        category: "",
        availability: ""
    };

    this.handleTabSelect = this.handleTabSelect.bind(this);
    this.renderTab = this.renderTab.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  renderTab() {
      switch(this.state.selectedTab) {
        case "Research papers": 
            return(
                <CitationsTable 
                    data={this.props.data}
                    date={this.state.date}
                    search={this.state.search}
                    category={this.state.category}
                    availability={this.state.availability}
                />
            )
            break;
        case "Top keywords": 
            return (
                <CitationsGroupedTable 
                data={this.props.data} 
                cols={[
                    { name: 'item', title: 'Keyword' },
                    { name: 'date', title: 'Date' },
                    { name: 'title', title: 'Title' }
                ]}
                listName='keywords'
                itemName='keyword'
                date={this.state.date}
                search={this.state.search}
                category={this.state.category}
                availability={this.state.availability}
                />
            )
            break;
        case "Top authors": 
            return (
                <CitationsGroupedTable 
                data={this.props.data}
                cols={[
                    { name: 'item', title: 'Author' },
                    { name: 'date', title: 'Date' },
                    { name: 'title', title: 'Title' }
                ]}
                listName='authors'
                itemName='name'
                date={this.state.date}
                search={this.state.search}
                category={this.state.category}
                availability={this.state.availability}
                />
            )
            break;
        default:
            return "Error"
      }
  }

  handleTabSelect(e) {
      this.setState({
          selectedTab: e.target.text
      });
  }

  onFilterChange(event) {
    this.state[event.target.name] = event.target.value;
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
        <div className="columns">
          <div className="column is-2">
            <CitationFilter 
              date={this.state.date} 
              search={this.state.search} 
              category={this.state.category}
              availability={this.state.availability}
              onFilterChange={this.onFilterChange}
              />
          </div>
          <div className="column is-10">
          <div className="tabs is-boxed">
            <ul>
                <li className={this.state.selectedTab == "Research papers" ? "is-active" : undefined}>
                    <a onClick={this.handleTabSelect}>Research papers</a>
                </li>
                <li className={this.state.selectedTab == "Top authors" ? "is-active" : undefined}>
                    <a onClick={this.handleTabSelect}>Top authors</a>
                </li>
                <li className={this.state.selectedTab == "Top keywords" ? "is-active" : undefined}>
                    <a onClick={this.handleTabSelect}>Top keywords</a>
                </li>
            </ul>
            </div>
            { this.renderTab() }
          </div>
        </div>
    )
  };
}
