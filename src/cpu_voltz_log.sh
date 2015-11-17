#!/bin/bash

file=cpu_volts_log.csv
dir=${HOME}/log

if [ -e ${dir}/${file}]; then
  vcgencmd measure_temp >> ${file}
  vcgencmd measure_volts >> ${file}
else
  vcgencmd measure_temp > ${file}
  vcgencmd measure_volts > ${file}
fi
