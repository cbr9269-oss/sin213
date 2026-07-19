const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", "0");
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

// Persistent data path: prefer mounted volume specified by DATA_DIR env var (e.g., /data)
const DATA_DIR = process.env.DATA_DIR || __dirname;
const DATA_FILE = path.join(DATA_DIR, 'data.json');

// If running with a mounted DATA_DIR (not repo dir) and there's no data file there,
// attempt to bootstrap by copying the repo data.json (if present).
try {
    if (DATA_DIR !== __dirname) {
        if (!fs.existsSync(DATA_DIR)) {
            fs.mkdirSync(DATA_DIR, { recursive: true });
        }
        const repoDataFile = path.join(__dirname, 'data.json');
        if (!fs.existsSync(DATA_FILE) && fs.existsSync(repoDataFile)) {
            // copy initial data into the mounted volume so it becomes persistent
            fs.copyFileSync(repoDataFile, DATA_FILE);
            console.log(`[startup] bootstrapped data file from repo to DATA_DIR (${DATA_DIR})`);
        }
    }
} catch (e) {
    console.error('[startup] failed to prepare DATA_DIR:', e && e.message);
}

const DEFAULT_DATA = {
    customers: [
        { id: 999, name: 'ลุงแดง', lat: 18.495127, lng: 98.897292, delivery_day: 'monday' },
        { id: 998, name: 'น้ำตาล', lat: 18.495642, lng: 98.896973, delivery_day: 'monday' },
        { id: 997, name: 'สารภี 2ล 5กป', lat: 18.493848, lng: 98.895686, delivery_day: 'monday' },
        { id: 996, name: 'ทอง-เบ้น 2ล', lat: 18.494155, lng: 98.895995, delivery_day: 'monday' },
        { id: 995, name: 'พ่อเงา 1ล 1กป', lat: 18.494467, lng: 98.896224, delivery_day: 'monday' },
        { id: 994, name: 'หลวงรัต 2ล', lat: 18.494328, lng: 98.895938, delivery_day: 'monday' },
        { id: 1784301623781, name: 'อ้ายวิทย์ 2ล', lat: 18.494238, lng: 98.896315, delivery_day: 'monday' },
        { id: 1001, name: 'น้าแรง 4ล 2กป', lat: 18.494576, lng: 98.896291, delivery_day: 'monday' },
        { id: 1002, name: 'ทอน-เจมส์ 1ล 1กป', lat: 18.494419, lng: 98.897410, delivery_day: 'monday' },
        { id: 1003, name: 'เช้าบ้านวัตร 2ล', lat: 18.494632, lng: 98.897388, delivery_day: 'monday' },
        { id: 1004, name: 'พี่ต๋า', lat: 18.494831, lng: 98.897486, delivery_day: 'monday' },
        { id: 1005, name: 'จันทร์-ดาว', lat: 18.495187, lng: 98.897840, delivery_day: 'monday' },
        { id: 1006, name: 'ภารโรง', lat: 18.494427, lng: 98.898073, delivery_day: 'monday' },
        { id: 1007, name: 'โรงเรียนดอนตอง', lat: 18.494127, lng: 98.897816, delivery_day: 'monday' },
        { id: 1008, name: 'ป้าเดือน 1ล', lat: 18.495229, lng: 98.898811, delivery_day: 'monday' },
        { id: 1009, name: 'หล้าเบอะ 2ล 2กป', lat: 18.495258, lng: 98.899005, delivery_day: 'monday' },
        { id: 1010, name: 'ปุ๋ย 2กป', lat: 18.495481, lng: 98.898448, delivery_day: 'monday' }
    ],
    debt_history: [
        { id: 1, customer_id: 999, amount: 50, date_record: '19/7' },
        { id: 2, customer_id: 999, amount: 80, date_record: '29/7' },
        { id: 3, customer_id: 999, amount: 100, date_record: '30/7' },
        { id: 4, customer_id: 999, amount: 40, date_record: '20/7' },
        { id: 5, customer_id: 998, amount: 40, date_record: '19/7' },
        { id: 6, customer_id: 998, amount: 70, date_record: '25/7' },
        { id: 7, customer_id: 998, amount: 20, date_record: '20/7' },
        { id: 8, customer_id: 998, amount: 20, date_record: '17/7' },
        { id: 9, customer_id: 998, amount: 40, date_record: '17/7' },
        { id: 10, customer_id: 998, amount: 90, date_record: '17/7' },
        { id: 11, customer_id: 996, amount: 80, date_record: '17/7' },
        { id: 12, customer_id: 995, amount: 30, date_record: '17/7' },
        { id: 2001, customer_id: 1004, amount: 50, date_record: '17/7' },
        { id: 2002, customer_id: 1004, amount: 50, date_record: '18/7' },
        { id: 2003, customer_id: 1004, amount: 50, date_record: '19/7' },
        { id: 2004, customer_id: 1004, amount: 30, date_record: '20/7' },
        { id: 2005, customer_id: 1004, amount: 50, date_record: '21/7' },
        { id: 2006, customer_id: 1004, amount: 50, date_record: '22/7' },
        { id: 2007, customer_id: 1004, amount: 50, date_record: '23/7' },
        { id: 2008, customer_id: 1004, amount: 50, date_record: '24/7' },
        { id: 2009, customer_id: 1004, amount: 50, date_record: '25/7' },
        { id: 2010, customer_id: 1004, amount: 50, date_record: '26/7' },
        { id: 2011, customer_id: 1004, amount: 30, date_record: '27/7' },
        { id: 2012, customer_id: 1004, amount: 50, date_record: '28/7' },
        { id: 3001, customer_id: 1007, amount: 60, date_record: '17/7' },
        { id: 3002, customer_id: 1009, amount: 38, date_record: '18/7' },
        { id: 3003, customer_id: 1009, amount: 54, date_record: '19/7' },
        { id: 3004, customer_id: 1009, amount: 74, date_record: '20/7' }
    ]
};

function normalizeData(data) {
    const normalized = {
        customers: Array.isArray(data?.customers) ? data.customers : [],
        debt_history: Array.isArray(data?.debt_history) ? data.debt_history : [],
        stops: Array.isArray(data?.stops) ? data.stops : []
    };

    const customerIds = new Set(normalized.customers.map(c => String(c.id)));
    normalized.debt_history = normalized.debt_history.filter((entry) => customerIds.has(String(entry.customer_id)));

    normalized.customers = normalized.customers.map((customer) => {
        const customerId = String(customer.id);
        const customerHistory = normalized.debt_history.filter((entry) => String(entry.customer_id) === customerId);
        const totalDebt = customerHistory.reduce((sum, entry) => sum + parseInt(entry.amount || 0, 10), 0);
        return { ...customer, debt: totalDebt };
    });

    // ensure stops have required fields
    normalized.stops = normalized.stops.map(s => ({
        id: s.id,
        driverId: s.driverId || null,
        lat: Number(s.lat),
        lng: Number(s.lng),
        startTs: Number(s.startTs) || 0,
        endTs: Number(s.endTs) || 0,
        duration: Number(s.duration) || 0,
        date: s.date || null,
        weekday: s.weekday || null,
        name: s.name || null
    }));

    return normalized;
}

function loadData() {
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT_DATA, null, 2), 'utf8');
        return JSON.parse(JSON.stringify(DEFAULT_DATA));
    }

    try {
        const parsed = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        const normalized = normalizeData(parsed);
        if (JSON.stringify(normalized) !== JSON.stringify(parsed)) {
            saveData(normalized);
        }
        return normalized;
    } catch (e) {
        return { customers: [], debt_history: [] };
    }
}

function saveData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

app.get('/api/customers', (req, res) => {
    const { day } = req.query;
    const data = loadData();

    let result = data.customers.map(c => {
        const totalDebt = data.debt_history
            .filter(h => String(h.customer_id) === String(c.id))
            .reduce((sum, h) => sum + parseInt(h.amount || 0, 10), 0);
        return { ...c, debt: totalDebt };
    });

    if (day) {
        result = result.filter(c => String(c.delivery_day || '').toLowerCase() === String(day).toLowerCase());
    }
    res.json(result);
});

// GET stops: optional filters: date=YYYY-MM-DD or weekday=monday
app.get('/api/stops', (req, res) => {
    const { date, weekday } = req.query;
    const data = loadData();
    let stops = Array.isArray(data.stops) ? data.stops.slice() : [];
    if (date) {
        stops = stops.filter(s => String(s.date) === String(date));
    }
    if (weekday) {
        stops = stops.filter(s => String(s.weekday).toLowerCase() === String(weekday).toLowerCase());
    }
    // sort by startTs
    stops.sort((a,b) => (a.startTs || 0) - (b.startTs || 0));
    res.json(stops);
});

// POST new stop (manual save) - body must include lat,lng and optional driverId,name,startTs,endTs
app.post('/api/stops', (req, res) => {
    try {
        const data = loadData();
        const { lat, lng, driverId, name, startTs, endTs } = req.body || {};
        const parsedLat = parseFloat(lat);
        const parsedLng = parseFloat(lng);
        if (isNaN(parsedLat) || isNaN(parsedLng)) {
            return res.status(400).json({ success: false, error: 'invalid lat/lng' });
        }
        const now = Date.now();
        const sStart = startTs ? Number(startTs) : now;
        const sEnd = endTs ? Number(endTs) : sStart;
        const duration = sEnd - sStart;
        const dateObj = new Date(sStart);
        const dateStr = `${dateObj.getFullYear()}-${String(dateObj.getMonth()+1).padStart(2,'0')}-${String(dateObj.getDate()).padStart(2,'0')}`;
        const weekday = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'][dateObj.getDay()];
        const stop = {
            id: Date.now() + Math.floor(Math.random()*1000),
            driverId: driverId || null,
            lat: parsedLat,
            lng: parsedLng,
            startTs: sStart,
            endTs: sEnd,
            duration: duration,
            date: dateStr,
            weekday: weekday,
            name: name || null
        };
        data.stops = data.stops || [];
        data.stops.push(stop);
        saveData(data);
        // broadcast
        io.emit('stop:created', stop);
        return res.json({ success: true, stop });
    } catch (e) {
        return res.status(500).json({ success: false, error: 'cannot save stop' });
    }
});

app.get('/api/customers/:id/history', (req, res) => {
    const data = loadData();
    const cid = parseInt(req.params.id);
    const history = data.debt_history.filter(h => h.customer_id === cid);
    res.json(history);
});

app.post('/api/customers/:id/debt', (req, res) => {
    const data = loadData();
    const cid = parseInt(req.params.id);
    const { amount, date_record, partial_payment } = req.body;

    const currentTotal = data.debt_history
        .filter((h) => String(h.customer_id) === String(cid))
        .reduce((sum, h) => sum + parseInt(h.amount || 0, 10), 0);

    const parsedAmount = parseInt(amount, 10);
    const shouldReduce = Boolean(partial_payment) && parsedAmount > 0;
    const safeAmount = shouldReduce ? Math.min(parsedAmount, Math.max(currentTotal, 0)) : parsedAmount;
    const finalAmount = shouldReduce ? -safeAmount : safeAmount;

    const newDebt = {
        id: Date.now() + Math.floor(Math.random() * 1000),
        customer_id: cid,
        amount: finalAmount,
        date_record: date_record || '17/7',
        kind: shouldReduce ? 'partial_payment' : 'debt'
    };

    if (finalAmount !== 0) {
        data.debt_history.push(newDebt);
        saveData(data);
    }

    res.json({ success: true, amount: finalAmount, total_after: currentTotal + finalAmount });
});

const updateCustomerName = (req, res) => {
    try {
        const data = loadData();
        const cid = parseInt(req.params.id, 10);
        const rawName = req.body && typeof req.body.name === 'string' ? req.body.name : '';
        const name = rawName.trim();

        if (!name) {
            return res.status(400).json({ error: 'กรุณากรอกชื่อก่อนบันทึก' });
        }

        const customerIndex = data.customers.findIndex(c => parseInt(c.id, 10) === cid);
        if (customerIndex === -1) {
            return res.status(404).json({ error: 'ไม่พบข้อมูลลูกค้าในระบบ' });
        }

        data.customers[customerIndex].name = name;
        saveData(data);
        return res.json({ success: true, name: data.customers[customerIndex].name });
    } catch (error) {
        return res.status(500).json({ error: 'เกิดข้อผิดพลาดในการบันทึกชื่อ' });
    }
};

app.put('/api/customers/:id/name', updateCustomerName);
app.put('/api/customers/:id/name/', updateCustomerName);

app.put('/api/customers/:id/location', (req, res) => {
    try {
        const data = loadData();
        const cid = parseInt(req.params.id, 10);
        const { lat, lng } = req.body;

        const customerIndex = data.customers.findIndex(c => parseInt(c.id, 10) === cid);
        if (customerIndex === -1) {
            return res.status(404).json({ error: 'ไม่พบข้อมูลลูกค้า' });
        }

        data.customers[customerIndex].lat = parseFloat(lat);
        data.customers[customerIndex].lng = parseFloat(lng);
        saveData(data);
        
        return res.json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: 'ไม่สามารถบันทึกตำแหน่งใหม่ได้' });
    }
});

app.delete('/api/debt-history/:historyId', (req, res) => {
    try {
        const data = loadData();
        const hid = parseInt(req.params.historyId, 10);
        const beforeLength = data.debt_history.length;
        data.debt_history = data.debt_history.filter((h) => {
            const entryId = parseInt(h.id, 10);
            return entryId !== hid;
        });
        if (data.debt_history.length !== beforeLength) {
            saveData(data);
            return res.json({ success: true });
        }
        return res.status(404).json({ success: false, error: 'ไม่พบรายการหนี้ที่ต้องการลบ' });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'ลบรายการหนี้ไม่สำเร็จ' });
    }
});

app.delete('/api/customers/:id/debt-history', (req, res) => {
    try {
        const data = loadData();
        const cid = parseInt(req.params.id, 10);
        const beforeLength = data.debt_history.length;
        data.debt_history = data.debt_history.filter((h) => String(h.customer_id) !== String(cid));
        const deletedCount = beforeLength - data.debt_history.length;
        saveData(data);
        return res.json({ success: true, deletedCount });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'ลบหนี้ทั้งหมดไม่สำเร็จ' });
    }
});

app.delete('/api/customers/:id', (req, res) => {
    try {
        const data = loadData();
        const cid = parseInt(req.params.id, 10);
        const customerIndex = data.customers.findIndex((c) => parseInt(c.id, 10) === cid);
        if (customerIndex === -1) {
            return res.status(404).json({ success: false, error: 'ไม่พบลูกค้าที่ต้องการลบ' });
        }

        data.customers.splice(customerIndex, 1);
        data.debt_history = data.debt_history.filter((h) => String(h.customer_id) !== String(cid));
        saveData(data);

        return res.json({ success: true });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'ลบลูกค้าไม่สำเร็จ' });
    }
});

app.post('/api/customers', (req, res) => {
    const data = loadData();
    const { name, lat, lng, debt, delivery_day, date_record } = req.body;
    const newCustomerId = Date.now();

    const newCustomer = {
        id: newCustomerId,
        name: name,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        delivery_day: delivery_day
    };

    data.customers.push(newCustomer);

    if (debt && parseInt(debt) > 0) {
        data.debt_history.push({
            id: Date.now() + 1,
            customer_id: newCustomerId,
            amount: parseInt(debt),
            date_record: date_record || '17/7'
        });
    }

    saveData(data);
    res.json({ success: true, id: newCustomerId });
});

const PORT = process.env.PORT || 3000;
loadData();

// Create HTTP server and attach Socket.IO for real-time tracking
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
    cors: { origin: '*' }
});

// In-memory store of last known driver positions
const lastDriverPositions = {}; // { driverId: { lat, lng, accuracy, ts } }
// in-memory recent positions buffer for stop detection
const recentPositions = {}; // driverId -> [{lat,lng,accuracy,ts}]
const DRIVER_BUFFER_MS = 5 * 60 * 1000; // keep 5 minutes of positions
const STOP_RADIUS_M = 25; // meters
const STOP_DWELL_MS = 90 * 1000; // 90 seconds

io.on('connection', (socket) => {
    // send current last known positions to newly connected client
    socket.emit('drivers:initial', Object.values(lastDriverPositions));

    socket.on('driver:position', (payload) => {
        try {
            const { driverId, lat, lng, accuracy, speed, heading, ts } = payload || {};
            if (!driverId || typeof lat !== 'number' || typeof lng !== 'number') return;
            const now = Date.now();
            const entry = { driverId, lat, lng, accuracy: Number(accuracy || 0), speed: Number(speed || 0), heading: Number(heading || 0), ts: ts || now };
            lastDriverPositions[driverId] = entry;

            // push to recentPositions buffer
            if (!recentPositions[driverId]) recentPositions[driverId] = [];
            recentPositions[driverId].push({ lat, lng, accuracy: Number(accuracy || 0), ts: entry.ts });
            // prune old
            recentPositions[driverId] = recentPositions[driverId].filter(p => (now - p.ts) <= DRIVER_BUFFER_MS);

            // attempt simple stop detection: if there exists a cluster of points near current point
            const pts = recentPositions[driverId];
            // find points within STOP_RADIUS_M of the latest point
            const within = pts.filter(p => distanceMeters(p.lat, p.lng, lat, lng) <= STOP_RADIUS_M);
            if (within.length > 0) {
                const earliest = Math.min(...within.map(p => p.ts));
                const latest = Math.max(...within.map(p => p.ts));
                const dwell = latest - earliest;
                // check last recorded stop to prevent duplicates
                const data = loadData();
                const driverStops = data.stops ? data.stops.filter(s => s.driverId === driverId) : [];
                const lastStop = driverStops.length ? driverStops[driverStops.length - 1] : null;
                const lastStopEnd = lastStop ? Number(lastStop.endTs || 0) : 0;
                const recentlyRecorded = (now - lastStopEnd) < (5 * 60 * 1000); // avoid duplicate within 5 min

                if (dwell >= STOP_DWELL_MS && !recentlyRecorded) {
                    // record stop: centroid of within points
                    const avg = within.reduce((acc, p) => { acc.lat += p.lat; acc.lng += p.lng; return acc; }, {lat:0,lng:0});
                    avg.lat /= within.length; avg.lng /= within.length;
                    const startTs = earliest;
                    const endTs = latest;
                    const duration = endTs - startTs;
                    const dateObj = new Date(startTs);
                    const dateStr = `${dateObj.getFullYear()}-${String(dateObj.getMonth()+1).padStart(2,'0')}-${String(dateObj.getDate()).padStart(2,'0')}`;
                    const weekday = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'][dateObj.getDay()];
                    const stop = {
                        id: Date.now() + Math.floor(Math.random()*1000),
                        driverId,
                        lat: avg.lat,
                        lng: avg.lng,
                        startTs,
                        endTs,
                        duration,
                        date: dateStr,
                        weekday,
                        name: null
                    };
                    data.stops = data.stops || [];
                    data.stops.push(stop);
                    saveData(data);
                    // broadcast new stop to clients
                    io.emit('stop:created', stop);
                }
            }

            // broadcast to all other clients
            socket.broadcast.emit('driver:update', entry);
        } catch (e) {
            // ignore malformed
        }
    });

    socket.on('disconnect', () => {
        // do not remove last position — keep last-known
    });
});

// helper: distance in meters between two lat/lng
function distanceMeters(lat1, lon1, lat2, lon2) {
    function toRad(v) { return v * Math.PI / 180; }
    const R = 6378137; // Earth radius in meters
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

server.listen(PORT, '0.0.0.0', () => {
    console.log(`[เซิร์ฟเวอร์จำค่าถาวร JSON V3.0] รันทำงานอยู่ที่พอร์ต ${PORT}`);
});