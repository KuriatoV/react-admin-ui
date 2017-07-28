import React from 'react'
import {groupFields} from '../../../../utils'
import {RaisedButton, Tabs, Tab} from 'material-ui'
import HasMany from './HasMany'
import {Link} from 'react-isomorphic-tools'
import Fields from './Fields'
import Delete from '../Delete'
import {Controls, ContentWrapper} from '../..'

export default class Show extends React.Component {

    render() {
        const {
            entity:{
                name,
                actions:{
                    show:{fields, hasMany},
                    edit,
                    del
                }
            },
            data,
            prefix,
            id,
            query
        } = this.props

        const tabs = groupFields(fields)
        return (
            <div>
                {tabs.length > 1 ?
                    <Tabs>
                        {tabs.map((item, index)=>
                            <Tab label={item.name || 'noName'} key={index}>
                                <Fields data={data} fields={item.fields}/>
                            </Tab>
                        )}
                    </Tabs>
                    :
                    <Fields data={data} fields={tabs[0].fields}/>
                }

                <ContentWrapper>
                    <HasMany hasMany={hasMany} name={name} id={id}/>
                </ContentWrapper>

                <ContentWrapper>

                    <Controls>
                        {id && del && <Delete id={id} name={name} del={del} query={query} prefix={prefix}/>}
                        {edit &&
                        <RaisedButton
                            label='Edit'
                            type='submit'
                            primary={true}
                            containerElement={
                                <Link to={{pathname: `${prefix}/${name}/${id}/edit`, query}}/>
                            }
                        />
                        }
                    </Controls>
                </ContentWrapper>
            </div>
        )
    }
}