import React, { Fragment } from 'react';
import classNames from 'classnames';
import { Button, Grid, Menu, MenuItem, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import toRenderProps from 'recompose/toRenderProps';
import withState from 'recompose/withState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown,faFileExport } from '@fortawesome/free-solid-svg-icons'
// import { config } from './config';
export const config = {
  angelIcon: ['fal', 'angle-down']
};

const WithState = toRenderProps(withState('anchorEl', 'updateAnchorEl', null));
const styles = theme => ({
    button: {
        margin: theme.spacing(1)
    },
    rightIcon: {
        marginLeft: theme.spacing(1)
    },
    iconSmall: {
        fontSize: 20
    }
});

const DataFormatExport = props => {
    const { classes } = props;
    return (
        <WithState>
            {({ anchorEl, updateAnchorEl }) => {
                const open = Boolean(anchorEl);
                const handleClose = () => {
                    updateAnchorEl(null);
                };
                return (
                    <Fragment>
                        <Tooltip title={props.disabled === true ? 'Access Denied' : ''}>
                            <div>
                                <Button
                                    size='small'
                                    className={classes.button}
                                    onClick={event => {
                                        updateAnchorEl(event.currentTarget);
                                    }}
                                    disabled={props.disabled}
                                >
                                    {props.exportLabel}
                                    <FontAwesomeIcon
                                        // icon={config.angelIcon}
                                        icon={faAngleDown}
                                        className={classNames(classes.rightIcon, classes.iconSmall)}
                                    />
                                </Button>
                            </div>
                        </Tooltip>
                        <Menu
                            id='render-props-menu'
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            {(props.type || []).map((value, key) => {
                                return (
                                    <MenuItem
                                        key={key}
                                        text={value}
                                        name={value}
                                        value={value}
                                        onClick={() => props.clickHandlers(value)}
                                    >
                                        <Grid onClick={handleClose}>
                                            {
                                                <Tooltip
                                                    title={
                                                        props.tooltip + ' ' + `${value}` + ' format'
                                                    }
                                                >
                                                    <span>
                                                        <FontAwesomeIcon
                                                            key={key}
                                                            // icon={[
                                                            //     'far',
                                                            //     `file-${
                                                            //         value === 'xlsx'
                                                            //             ? 'excel'
                                                            //             : value
                                                            //     }`
                                                            // ]}
                                                            icon={faFileExport}
                                                            size='lg'
                                                        />
                                                    </span>
                                                </Tooltip>
                                            }
                                        </Grid>
                                    </MenuItem>
                                );
                            })}
                        </Menu>
                    </Fragment>
                );
            }}
        </WithState>
    );
};

DataFormatExport.defaultProps = {
    type: [
        {
            FileFormat: 'PDF'
        },
        {
            FileFormat: 'CSV'
        },
        {
            FileFormat: 'XLSX'
        }
    ],

    clickHandlers: null
};
export default withStyles(styles)(DataFormatExport);
