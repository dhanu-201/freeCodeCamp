import { TabPane, Tabs } from '@freecodecamp/react-bootstrap';
import i18next from 'i18next';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators, Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import envData from '../../../../../config/env.json';
import ToolPanel from '../components/tool-panel';
import { currentTabSelector, moveToTab } from '../redux';
import EditorTabs from './editor-tabs';

const { showUpcomingChanges } = envData;

const mapStateToProps = createStructuredSelector({
  currentTab: currentTabSelector as (state: unknown) => number
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      moveToTab
    },
    dispatch
  );
interface MobileLayoutProps {
  currentTab: number;
  editor: JSX.Element | null;
  guideUrl: string;
  hasPreview: boolean;
  instructions: JSX.Element;
  moveToTab: typeof moveToTab;
  preview: JSX.Element;
  testOutput: JSX.Element;
  videoUrl: string;
}
class MobileLayout extends Component<MobileLayoutProps> {
  static displayName: string;
  componentDidMount() {
    if (this.props.currentTab !== 1) this.props.moveToTab(1);
  }
  render() {
    const {
      currentTab,
      moveToTab,
      instructions,
      editor,
      testOutput,
      hasPreview,
      preview,
      guideUrl,
      videoUrl
    } = this.props;

    const editorTabPaneProps = {
      mountOnEnter: true,
      unmountOnExit: true
    };

    return (
      <>
        <Tabs
          activeKey={currentTab}
          defaultActiveKey={1}
          id='challenge-page-tabs'
          onSelect={moveToTab}
        >
          <TabPane eventKey={1} title={i18next.t('learn.editor-tabs.info')}>
            {instructions}
          </TabPane>
          <TabPane
            eventKey={2}
            title={i18next.t('learn.editor-tabs.code')}
            {...editorTabPaneProps}
          >
            {showUpcomingChanges && <EditorTabs />}
            {editor}
          </TabPane>
          <TabPane
            eventKey={3}
            title={i18next.t('learn.editor-tabs.tests')}
            {...editorTabPaneProps}
          >
            {testOutput}
          </TabPane>
          {hasPreview && (
            <TabPane
              eventKey={4}
              title={i18next.t('learn.editor-tabs.preview')}
            >
              {preview}
            </TabPane>
          )}
        </Tabs>
        <ToolPanel guideUrl={guideUrl} isMobile={true} videoUrl={videoUrl} />
      </>
    );
  }
}

MobileLayout.displayName = 'MobileLayout';

export default connect(mapStateToProps, mapDispatchToProps)(MobileLayout);
