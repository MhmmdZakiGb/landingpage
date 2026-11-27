'use client';

import { useEffect, useState } from 'react';
import { ARMADA_UNITS } from '@/lib/data/armada';
import { fetchUnits } from '@/lib/api';
import { HeavyEquipmentUnit } from '@/lib/types/booking';

export function useArmadaUnits() {
  const [units, setUnits] = useState<HeavyEquipmentUnit[]>(ARMADA_UNITS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFromApi, setIsFromApi] = useState<boolean>(false);

  useEffect(() => {
    let active = true;

    fetchUnits()
      .then((apiUnits) => {
        if (active && apiUnits.length > 0) {
          setUnits(apiUnits);
          setIsFromApi(true);
        }
      })
      .catch(() => {
        // Keep fallback ARMADA_UNITS if backend is offline
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { units, isLoading, isFromApi };
}
