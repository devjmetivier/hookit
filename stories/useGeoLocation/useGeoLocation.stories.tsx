import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useGeoLocation } from '@hookit/geo-location';

export default {
  title: 'hookit/useGeoLocation',
} as Meta;

export const Default: Story = () => {
  const { geoLocation, getPosition } = useGeoLocation();

  return (
    <>
      <button onClick={getPosition} type='button'>
        Get location data
      </button>

      <h3>Location data:</h3>
      <p>accuracy: {geoLocation?.coords.accuracy || '¯\\_(ツ)_/¯'}</p>
      <p>altitude: {geoLocation?.coords.altitude || '¯\\_(ツ)_/¯'}</p>
      <p>altitudeAccuracy: {geoLocation?.coords.altitudeAccuracy || '¯\\_(ツ)_/¯'}</p>
      <p>heading: {geoLocation?.coords.heading || '¯\\_(ツ)_/¯'}</p>
      <p>latitude: {geoLocation?.coords.latitude || '¯\\_(ツ)_/¯'}</p>
      <p>longitude: {geoLocation?.coords.longitude || '¯\\_(ツ)_/¯'}</p>
      <p>speed: {geoLocation?.coords.speed || '¯\\_(ツ)_/¯'}</p>
    </>
  );
};

export const Watch: Story = () => {
  const { geoLocation } = useGeoLocation(true);

  return (
    <>
      <p>The information below should update somewhat frequently</p>

      <h3>Location data:</h3>
      <p>accuracy: {geoLocation?.coords.accuracy || '¯\\_(ツ)_/¯'}</p>
      <p>altitude: {geoLocation?.coords.altitude || '¯\\_(ツ)_/¯'}</p>
      <p>altitudeAccuracy: {geoLocation?.coords.altitudeAccuracy || '¯\\_(ツ)_/¯'}</p>
      <p>heading: {geoLocation?.coords.heading || '¯\\_(ツ)_/¯'}</p>
      <p>latitude: {geoLocation?.coords.latitude || '¯\\_(ツ)_/¯'}</p>
      <p>longitude: {geoLocation?.coords.longitude || '¯\\_(ツ)_/¯'}</p>
      <p>speed: {geoLocation?.coords.speed || '¯\\_(ツ)_/¯'}</p>
    </>
  );
};
