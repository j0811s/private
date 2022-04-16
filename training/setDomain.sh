#!/bin/sh

source ./.env

sudo sh -c "echo '# Added by localdev \n127.0.0.1 $WORKING_DIR.localdev.com \n# End of section' >> /etc/hosts"