import React from 'react';
import './directory-menu.scss';
import MenuItem from '../menu-item/menu-item';
import {connect} from 'react-redux';

import {selectDirectorySections} from '../../redux/directory/directory-selectors';
import { createStructuredSelector } from 'reselect';

const Directory = ({sections}) => (
    <div className = 'directory-menu'>
        {
            sections.map(({id, ...otherSectionProps})=> (
                <MenuItem key = {id} {...otherSectionProps}/>
            ) )
        }
    </div>
      );

const mapStateToProps = createStructuredSelector ({
  sections: selectDirectorySections
})

export default connect(mapStateToProps)(Directory);

/*ESX trick*

title={title} imageUrl={imageUrl} size={size} linkUrl = {linkUrl}
{id, ...otherSectionProps}





*/