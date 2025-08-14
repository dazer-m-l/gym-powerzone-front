import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import createStyles from './styles/SecciónHorario.styles';

interface Horario {
  horario_id: number;
  clase_id: number;
  dia_semana: string;
  hora_inicio: string;
  hora_fin: string;
}

interface Clase {
  clase_id: number;
  nombre_clase: string;
  descripcion: string;
  precio_clase: string;
  imagen_url: string;
}

const dias = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];
const diasMap: Record<string, string> = {
  Lunes: 'LUN',
  Martes: 'MAR',
  Miércoles: 'MIÉ',
  Jueves: 'JUE',
  Viernes: 'VIE',
  Sábado: 'SÁB',
  Domingo: 'DOM',
};

const esDiaSemana = (dia: string) => Object.keys(diasMap).includes(dia);

const SeccionHorario: React.FC = () => {
  const { width: screenWidth } = useWindowDimensions();
  const styles = createStyles(screenWidth);

  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [clases, setClases] = useState<Clase[]>([]);
  const [schedule, setSchedule] = useState<
    Record<string, Record<string, { activity: string; time: string } | null>>
  >({});

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const res = await axios.get<Horario[]>('https://gym-powerzone-back-production.up.railway.app/api/horarios');
        setHorarios(res.data);
      } catch (error) {
        console.error('Error fetching horarios:', error);
      }
    };

    const fetchClases = async () => {
      try {
        const res = await axios.get<Clase[]>('https://gym-powerzone-back-production.up.railway.app/api/clases');
        setClases(res.data);
      } catch (error) {
        console.error('Error fetching clases:', error);
      }
    };

    fetchHorarios();
    fetchClases();
  }, []);

  useEffect(() => {
    if (!horarios.length || !clases.length) return;

    // Mapeo clase_id -> nombre_clase
    const claseIdANombre: Record<number, string> = {};
    clases.forEach(({ clase_id, nombre_clase }) => {
      claseIdANombre[clase_id] = nombre_clase;
    });

    // Obtener horas únicas ordenadas
    const horasUnicasSet = new Set<string>();
    horarios.forEach(({ hora_inicio }) => {
      horasUnicasSet.add(hora_inicio);
    });
    const horasUnicas = Array.from(horasUnicasSet).sort();

    // Inicializar schedule con nulls
    const newSchedule: Record<string, Record<string, { activity: string; time: string } | null>> = {};
    horasUnicas.forEach((hora) => {
      newSchedule[hora] = {};
      dias.forEach((diaAbrev) => {
        newSchedule[hora][diaAbrev] = null;
      });
    });

    // Llenar schedule con datos correctos
    horarios.forEach(({ clase_id, dia_semana, hora_inicio, hora_fin }) => {
      if (!esDiaSemana(dia_semana)) return;

      const diaAbrev = diasMap[dia_semana];
      if (!dias.includes(diaAbrev)) return;

      const nombreClase = claseIdANombre[clase_id] ?? `Clase ${clase_id}`;

      newSchedule[hora_inicio][diaAbrev] = {
        activity: nombreClase,
        time: `${hora_inicio.substring(0, 5)} - ${hora_fin.substring(0, 5)}`,
      };
    });

    setSchedule(newSchedule);
  }, [horarios, clases]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.subtitle}>nuestro horario semanal de gimnasio</Text>
        <Text style={styles.title}>Horario de Entrenamiento</Text>
      </View>

      <ScrollView horizontal contentContainerStyle={styles.tableContainer}>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <View style={styles.headerCellTime}>
              <MaterialCommunityIcons name="calendar" style={styles.calendarIcon} />
            </View>
            {dias.map((dia) => (
              <View key={dia} style={styles.headerCell}>
                <Text style={styles.headerText}>{dia}</Text>
              </View>
            ))}
          </View>

          {Object.keys(schedule).map((timeSlot) => (
            <View key={timeSlot} style={styles.row}>
              <View style={styles.timeCell}>
                <Text style={styles.timeText}>{timeSlot.substring(0, 5)}</Text>
              </View>
              {dias.map((dia) => {
                const activity = schedule[timeSlot][dia];
                return (
                  <View key={dia} style={styles.cell}>
                    {activity && (
                      <>
                        <Text style={styles.activityText}>{activity.activity}</Text>
                        <Text style={styles.timeRangeText}>{activity.time}</Text>
                      </>
                    )}
                  </View>
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SeccionHorario;
