import {
  Button,
  Card,
  CardActions, CardContent,
  Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const Number = ({ value = 0, onMint = () => {} }) => (
  <Card>
    <CardContent>
      <Typography color="textSecondary">{value}</Typography>
    </CardContent>
    <CardActions>
      <Button type="button" variant="contained" color="primary" onClick={onMint}>Mint</Button>
    </CardActions>
  </Card>
);

Number.propTypes = {
  value: PropTypes.number.isRequired,
  onMint: PropTypes.func.isRequired,
};

export default Number;
