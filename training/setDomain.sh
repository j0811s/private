#!/bin/sh

sudo sh -c "echo '# Added by localdev \n127.0.0.1 $1.localdev.com \n# End of section' >> /etc/hosts"