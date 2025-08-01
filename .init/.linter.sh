#!/bin/bash
cd /home/kavia/workspace/code-generation/railway-ticket-reservation-system-93308/railway_ticket_reservation_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

