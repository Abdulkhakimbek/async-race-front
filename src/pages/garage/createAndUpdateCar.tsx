import { useState, useEffect } from 'react';
import { Stack, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import ColorPicker from 'src/components/colorPicker';
import { useGarageContext } from './context';

type Props = {
  children?: React.ReactNode;
  action: 'CREATE' | 'UPDATE';
};

export default function CreateAndUpdateCar({ action }: Props) {
  const { onCreateCar, onUpdateCar, selectedCar, update, newCar } = useGarageContext();
  const [car, setCar] = useState({ ...newCar });
  const isUpdate = action === 'UPDATE';

  const handleCreateAndUpdate = async () => {
    if (isUpdate) {
      onUpdateCar(car);
    } else {
      onCreateCar(car);
    }
  };

  useEffect(() => {
    if (isUpdate && selectedCar) {
      setCar(selectedCar);
    } else {
      setCar({
        name: '',
        color: '#ffffff',
      });
    }
  }, [selectedCar, isUpdate]);

  useEffect(() => {
    if (!isUpdate) {
      update('newCar', car);
    }
  }, [car]);

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <TextField
        variant="outlined"
        placeholder="TYPE CAR BRAND"
        size="small"
        sx={{
          background: 'white',
          borderRadius: '4px',
        }}
        value={car.name}
        onChange={(e) => setCar((prev) => ({ ...prev, name: e?.target?.value }))}
      />
      <ColorPicker setCar={setCar} car={car} />
      <Button variant="outlined" color="warning" onClick={handleCreateAndUpdate}>
        {action}
      </Button>
    </Stack>
  );
}
