import React, { Component } from "react";
import { Segment, Header, Icon, Input } from "semantic-ui-react";

class MessagesHeader extends Component {
  render() {
    const {
      channelName,
      numUniqueUsers,
      handleSearchChange,
      searchLoading,
      privateChannel
    } = this.props;

    return (
      <Segment clearing>
        {/* channel title */}
        <Header
          fluid="true"
          as="h2"
          floated="left"
          style={{ margineBottom: 0 }}
        >
          <span>
            {channelName}
            {!privateChannel && <Icon name="star outline" color="black" />}
          </span>
          <Header.Subheader>{numUniqueUsers}</Header.Subheader>
        </Header>

        {/* channel search input */}
        <Header floated="right">
          <Input
            loading={searchLoading}
            onChange={handleSearchChange}
            size="mini"
            icon="search"
            name="searchTerm"
            placeholder="Search Messages"
          />
        </Header>
      </Segment>
    );
  }
}

export default MessagesHeader;
