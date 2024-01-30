const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'gestion_de_consom',
});

const secretKey = 'secret-key';

async function getUserByEmail(email) {
    const [rows] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
}


app.post('/login', async (req, res) => {
    const {email, password} = req.body;

    console.log('Received data:', {email, password});

    try {
        const user = await getUserByEmail(email);

        if (!user) {
            console.log('User not found');
            return res.status(401).json({error: 'Invalid credentials'});
        }

        if (password !== user.password) {
            console.log('Invalid password');
            return res.status(401).json({error: 'Invalid credentials'});
        }

        const token = jwt.sign(
            {userId: user.user_id, email: user.email},
            secretKey,
            {
                expiresIn: '1h',
            }
        );
        res.json({message: 'Login successful', token, user});
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


app.post('/addOrUpdateYear', async (req, res) => {
    const {existingYear, newYear} = req.body;

    try {
        const [existingYearResult] = await db.promise().query('SELECT * FROM annee WHERE ANNEE = ?', [existingYear]);

        if (existingYearResult.length > 0) {
            await db.promise().query('UPDATE annee SET ANNEE = ? WHERE ANNEE = ?', [newYear, existingYear]);
            console.log('Year updated successfully');
            res.status(200).json({message: 'Year updated successfully'});
        } else {
            await db.promise().query('INSERT INTO annee (ANNEE) VALUES (?)', [newYear]);
            console.log('Year added successfully');
            res.status(200).json({message: 'Year added successfully'});
        }
    } catch (error) {
        console.error('Error adding/updating year:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


async function getRegionIdByName(regionName) {
    const [rows] = await db.promise().query('SELECT ID_R FROM region WHERE REGION = ?', [regionName]);
    if (rows.length > 0) {
        return rows[0].ID_R;
    }
    return null;
}

app.get('/regions', (req, res) => {
    console.log('Fetching regions...');
    db.query('SELECT * FROM region', (error, results) => {
        if (error) {
            console.error('Error fetching regions:', error);
            res.status(500).json({error: 'Internal Server Error'});
        } else {
            console.log('Regions:', results);
            res.json(results);
        }
    });
});
app.post('/addOrUpdateDepartement', (req, res) => {
    const {newDepartement, existingDepartement, regionId} = req.body;

    if (existingDepartement) {
        db.query(
            'UPDATE departement SET DEPARTEMENT = ? , ID_R = ? WHERE DEPARTEMENT = ?',
            [newDepartement, regionId, existingDepartement],
            (error, results) => {
                if (error) {
                    console.error('Error updating departement:', error);
                    res.status(500).json({error: 'Internal Server Error'});
                } else {
                    res.json({message: 'Departement updated successfully'});
                }
            }
        );
    } else {
        db.query(
            'INSERT INTO departement (DEPARTEMENT, ID_R) VALUES (?, ?)',
            [newDepartement, regionId],
            (error, results) => {
                if (error) {
                    console.error('Error adding departement:', error);
                    res.status(500).json({error: 'Internal Server Error'});
                } else {
                    res.json({message: 'Departement added successfully'});
                }
            }
        );
    }
});

app.delete('/deleteDepartement/:departementToDelete', (req, res) => {
    const {departementToDelete} = req.params;
    console.log(departementToDelete)
    db.query(
        'DELETE FROM departement WHERE ID_D = ?',
        [departementToDelete],
        (error, results) => {
            if (error) {
                console.error('Error deleting departement:', error);
                res.status(500).json({error: 'Internal Server Error'});
            } else {
                res.json({message: 'Departement deleted successfully'});
            }
        }
    );
});

app.post('/addOrUpdateRegion', async (req, res) => {
    const {existingRegion, newRegion} = req.body;

    try {
        const [existingRegionResult] = await db.promise().query('SELECT * FROM region WHERE REGION = ?', [existingRegion]);

        if (existingRegionResult.length > 0) {
            await db.promise().query('UPDATE region SET REGION = ? WHERE REGION = ?', [newRegion, existingRegion]);
            console.log('Region updated successfully');
            res.status(200).json({message: 'Region updated successfully'});
        } else {
            await db.promise().query('INSERT INTO region (REGION) VALUES (?)', [newRegion]);
            console.log('Region added successfully');
            res.status(200).json({message: 'Region added successfully'});
        }
    } catch (error) {
        console.error('Error adding/updating region:', error);
        res.status(500).json({error: 'Internal Server Error', message: error.message});
    }
});

app.delete('/deleteRegion/:regionid', async (req, res) => {
    const {regionid} = req.params;
    console.log(req.params)

    try {
        const [existingRegion] = await db.promise().query('SELECT * FROM region WHERE ID_R = ?', [regionid]);

        if (existingRegion.length > 0) {
            await db.promise().query('DELETE FROM region WHERE ID_R = ?', [regionid]);
            console.log('Region deleted successfully');
            res.status(200).json({message: 'Region deleted successfully'});
        } else {
            console.log('Region does not exist');
            res.status(404).json({error: 'Region not found'});
        }
    } catch (error) {
        console.error('Error deleting region:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

app.get('/getRegionForDepartement/:id', (req, res) => {
    const departmentId = req.params.id;

    const query = 'SELECT r.REGION FROM departement d JOIN region r ON d.ID_R = r.ID_R WHERE d.ID_D = ?';

    db.query(query, [departmentId], (error, results) => {
        if (error) {
            console.error('Error fetching region for department:', error);
            res.status(500).json({error: 'Internal Server Error'});
        } else {
            if (results.length > 0) {
                res.json(results[0]); 
            } else {
                res.status(404).json({error: 'Region not found for the department'});
            }
        }
    });
});



app.post('/addOrUpdateOperateur', async (req, res) => {
    const {existingOperateur, newOperateur} = req.body;

    try {
        const [existingOperateurResult] = await db.promise().query('SELECT * FROM operateur WHERE OPERATEUR = ?', [existingOperateur]);

        if (existingOperateurResult.length > 0) {
            await db.promise().query('UPDATE operateur SET OPERATEUR = ? WHERE OPERATEUR = ?', [newOperateur, existingOperateur]);
            console.log('Operateur updated successfully');
            res.status(200).json({message: 'Operateur updated successfully'});
        } else {
            await db.promise().query('INSERT INTO operateur (OPERATEUR) VALUES (?)', [newOperateur]);
            console.log('Operateur added successfully');
            res.status(200).json({message: 'Operateur added successfully'});
        }
    } catch (error) {
        console.error('Error adding/updating operateur:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


app.delete('/deleteOperateur/:operateurid', async (req, res) => {
    console.log(req.params)
    const {operateurid} = req.params
    try {
        await db.promise().query('DELETE FROM consommation WHERE ID_O  = ?', [operateurid]);
        await db.promise().query('DELETE FROM operateur WHERE ID_O = ?', [operateurid]);

        console.log('Operateur deleted successfully');
        res.status(200).json({message: 'Operateur deleted successfully'});
    } catch (error) {
        console.error('Error deleting operateur:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

app.post('/addOrUpdateProduit', (req, res) => {
    const {existingProduit, newProduit} = req.body;

    if (existingProduit) {
        const updateQuery = 'UPDATE produit SET PRODUIT = ? WHERE PRODUIT = ?';
        db.query(updateQuery, [newProduit, existingProduit], (error, results) => {
            if (error) throw error;
            res.json({success: true, message: 'Produit updated successfully'});
        });
    } else {
        const insertQuery = 'INSERT INTO produit (PRODUIT) VALUES (?)';
        db.query(insertQuery, [newProduit], (error, results) => {
            if (error) throw error;
            res.json({success: true, message: 'Produit added successfully'});
        });
    }
});

app.delete('/deleteProduit/:produitid', (req, res) => {
    const produitid = req.params.produitid;
    const deleteQuery = 'DELETE FROM produit WHERE ID_P = ?';
    db.query(deleteQuery, [produitid], (err, result) => {
        if (err) {
            console.error('Error deleting produit:', err);
            res.status(500).send('Error deleting produit');
        } else {
            res.status(200).send('Produit deleted successfully');
        }
    });
});


app.get('/getregions', (req, res) => {
    console.log('Fetching regions...');
    db.query('SELECT * FROM region', (error, results) => {
        if (error) {
            console.error('Error fetching regions:', error);
            res.status(500).json({error: 'Internal Server Error'});
        } else {
            console.log('Regions:', results);
            res.json(results);
        }
    });
});


app.get('/getallmonth', (req, res) => {
    console.log('Fetching regions...');
    db.query('SELECT * FROM p_mois', (error, results) => {
        if (error) {
            console.error('Error fetching regions:', error);
            res.status(500).json({error: 'Internal Server Error'});
        } else {
            console.log('Regions:', results);
            res.json(results);
        }
    });
});


app.get('/getDepartementById/:id', (req, res) => {
    const departementId = req.params.id;

    db.query('SELECT * FROM departement WHERE ID_D = ?', [departementId], (err, results) => {
        if (err) {
            console.error('Error fetching departement by ID:', err);
            res.status(500).json({error: 'Internal Server Error'});
        } else {
            const departement = results[0];
            res.status(200).json(departement);
        }
    });
});

app.get('/getProduitById/:id', (req, res) => {
    const produitId = req.params.id;

    db.query('SELECT * FROM produit WHERE ID_P = ?', [produitId], (err, results) => {
        if (err) {
            console.error('Error fetching produit by ID:', err);
            res.status(500).json({error: 'Internal Server Error'});
        } else {
            const produit = results[0];
            res.status(200).json(produit);
        }
    });
});

app.get('/getMoisById/:id', (req, res) => {
    const moisId = req.params.id;

    db.query('SELECT * FROM p_mois WHERE ID_M = ?', [moisId], (err, results) => {
        if (err) {
            console.error('Error fetching mois by ID:', err);
            res.status(500).json({error: 'Internal Server Error'});
        } else {
            const mois = results[0];
            res.status(200).json(mois);
        }
    });
});

app.get('/years', (req, res) => {
    console.log('Fetching years...');
    db.query('SELECT * FROM annee', (error, results) => {
        if (error) {
            console.error('Error fetching years:', error);
            res.status(500).json({error: 'Internal Server Error'});
        } else {
            console.log('Years:', results);
            res.json(results);
        }
    });
});

app.get('/emptyYears', (req, res) => {
    const query = `
    SELECT ANNEE
    FROM annee
    WHERE ANNEE NOT IN (
      SELECT ANNEE
      FROM donneconsom
    );
  `;

    db.query(query, (err, result) => {
        if (err) {
            console.error('MySQL query error:', err);
            res.status(500).json({error: 'Internal Server Error'});
        } else {
            res.json(result);
        }
    });
});

app.post('/addDonneConsom', async (req, res) => {
    const {ANNEE, ID_R, DEPAT_CREDIT, DOTA_DEFINITIVE, COMISSION, ID_P} = req.body;

    try {
        const result = await db.promise().query(
            'INSERT INTO donneconsom (ANNEE, ID_R, DEPAT_CREDIT, DOTA_DEFINITIVE, COMISSION, ID_P) VALUES (?, ?, ?, ?, ?, ?)',
            [ANNEE, ID_R, DEPAT_CREDIT, DOTA_DEFINITIVE, COMISSION, ID_P]
        );

        console.log('DonneConsom ajoutée avec succès');
        res.status(200).json({message: 'DonneConsom ajoutée avec succès', result});
    } catch (error) {
        console.error('Erreur lors de l\'ajout de DonneConsom:', error);
        res.status(500).json({error: 'Internal Server Error', errorMessage: error.message});
    }
});

app.post('/updateDonneConsom/:id', async (req, res) => {
    const id = req.params.id;
    const {ANNEE, ID_R, DEPAT_CREDIT, DOTA_DEFINITIVE, COMISSION, ID_P} = req.body;

    try {
        const result = await db.promise().query(
            'UPDATE donneconsom SET ANNEE = ?, ID_R = ?, DEPAT_CREDIT = ?, DOTA_DEFINITIVE = ?, COMISSION = ?, ID_P = ? WHERE ID_DC = ?',
            [ANNEE, ID_R, DEPAT_CREDIT, DOTA_DEFINITIVE, COMISSION, ID_P, id]
        );

        console.log('DonneConsom mise à jour avec succès');
        res.status(200).json({message: 'DonneConsom mise à jour avec succès', result});
    } catch (error) {
        console.error('Erreur lors de la mise à jour de DonneConsom:', error);
        res.status(500).json({error: 'Internal Server Error', errorMessage: error.message});
    }
});


app.get('/DonneConsomData', async (req, res) => {
    try {
        console.log('Fetching DonneConsomData...');
        const [results] = await db.promise().query('SELECT * FROM donneconsom');

        if (results.length === 0) {
            res.json([]); 
            return;
        }

        const enhancedResults = await Promise.all(results.map(async (item) => {
            const [produit] = await db.promise().query('SELECT ID_P, PRODUIT FROM produit WHERE ID_P = ?', [item.ID_P]);
            const [region] = await db.promise().query('SELECT ID_R, REGION FROM region WHERE ID_R = ?', [item.ID_R]);

            return {
                ...item,
                produit: produit.length > 0 ? produit[0].PRODUIT : null,
                region: region.length > 0 ? region[0].REGION : null,
            };
        }));

        console.log('Enhanced DonneConsomData:', enhancedResults);
        res.json(enhancedResults);
    } catch (error) {
        console.error('Error fetching and enhancing donneconsom data:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});



app.get('/getUserInfo/:userID', async (req, res) => {
    const userID = req.params.userID;
    try {
        const userInfoQuery =` SELECT users.*, departement.DEPARTEMENT, region.REGION
            FROM users
            LEFT JOIN departement ON users.ID_D = departement.ID_D
            LEFT JOIN region ON departement.ID_R = region.ID_R
            WHERE users.user_id = ${userID}`;
        const [userInfo] = await db.promise().query(userInfoQuery);
        if (userInfo.length === 0) {
            res.status(404).json({error: 'User not found'});
        } else {
            res.json(userInfo[0]);
        }
    } catch (error) {
        console.error('Error fetching user department and region:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


app.get('/getProduits', (req, res) => {
    try {
        const query = 'SELECT * FROM produit';
        db.query(query, (error, results) => {
            if (error) {
                throw error;
            }

            const produits = results.map((result) => ({
                ID_P: result.ID_P,
                PRODUIT: result.PRODUIT,
            }));

            if (produits.length === 0) {
                throw new Error('No produit options found');
            }
            res.json(produits);
        });
    } catch (error) {
        console.error('Error fetching produit options:', error.message);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

app.get('/getOperateurs', (req, res) => {
    try {
        const query = 'SELECT * FROM operateur';
        db.query(query, (error, results) => {
            if (error) {
                throw error;
            }

            const operateurOptions = results.map((result) => result);

            if (operateurOptions.length === 0) {
                throw new Error('No operateur options found');
            }

            res.json(operateurOptions);
        });
    } catch (error) {
        console.error('Error fetching operateur options:', error.message);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

app.get('/getAnnees', (req, res) => {
    const query = 'SELECT ANNEE FROM annee';

    db.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching annees:', error);
            res.status(500).json({error: 'Internal Server Error'});
            return;
        }

        const annees = results.map((result) => result.ANNEE);
        console.log('Fetched annees successfully:', annees);
        res.json(annees);
    });
});

app.get('/getAllConsommationData', async (req, res) => {
    try {
        const result = await db.promise().query('SELECT * FROM consommation');
        res.json(result[0]);
    } catch (error) {
        console.error('Error fetching all data from consommation:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/getFilteredConsommationData', async (req, res) => {
    try {
        const {annee, departement, produit} = req.query;

        let query = 'SELECT * FROM consommation WHERE 1=1';

        if (annee) {
            query += ` AND ANNEE = ${db.escape(annee)}`;
        }

        if (departement) {
            query += ` AND ID_D = ${db.escape(departement)}`;
        }

        if (produit) {
            query += ` AND ID_P = ${db.escape(produit)}`;
        }

        const result = await db.promise().query(query);
        res.json(result[0]);
    } catch (error) {
        console.error('Error fetching filtered consommation data:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/getMonths/?:ANNEE/?:ID_P/:ID_D', async (req, res) => {
    const {ANNEE, ID_P, ID_D} = req.params
    try {
        const query =
            `
                SELECT *
                FROM p_mois
                WHERE p_mois.MOIS NOT IN (
                SELECT pm.MOIS
                FROM p_mois pm
                JOIN consommation c ON pm.ID_M = c.ID_M
                WHERE c.ANNEE = ${ANNEE} and ID_D = ${ID_D}
                AND c.ID_P IN (SELECT ID_P FROM produit WHERE ID_P = ${ID_P})
                AND c.MNT_CONS IS NOT NULL);
            `
        const months = await db.promise().query(query);
        console.log(months)
        res.json(months);
    } catch (error) {
        console.error('Error fetching months:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

app.post('/consommation', (req, res) => {
    const Data = req.body;
    const userData = {
        ...Data,
        ID_P: parseInt(Data.ID_P),
        ID_M: parseInt(Data.ID_M),
        ID_O: parseInt(Data.ID_O),
        MNT_CONS: parseInt(Data.MNT_CONS),
        ANNEE: parseInt(Data.ANNEE)
    }
    db.query('INSERT INTO consommation SET ?', userData, (err, results) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            res.status(500).json({error: 'Internal Server Error'});
        } else {
            console.log('Data inserted successfully');
            res.status(200).json({message: 'Data inserted successfully'});
        }
    });
});

app.post('/users', (req, res) => {
    const userData = req.body;

    db.query('INSERT INTO users SET ?', userData, (err, results) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            res.status(500).json({error: 'Internal Server Error'});
        } else {
            console.log('User inserted successfully');
            res.status(200).json({message: 'User inserted successfully'});
        }
    });
});

app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Error retrieving data from MySQL:', err);
            res.status(500).json({error: 'Internal Server Error'});
        } else {
            res.status(200).json(results);
        }
    });
});

app.get('/users/:userId', (req, res) => {
    const userId = req.params.userId;

    db.query('SELECT * FROM users WHERE user_id = ?', [userId], (err, results) => {
        if (err) {
            console.error('Error retrieving data from MySQL:', err);
            res.status(500).json({error: 'Internal Server Error'});
        } else {
            if (results.length === 0) {
                res.status(404).json({error: 'User not found'});
            } else {
                res.status(200).json(results[0]);
            }
        }
    });
});

app.use(bodyParser.urlencoded({extended: true}));

// Update a user by user_id
app.get('/departements', (req, res) => {
    db.query('SELECT * FROM departement', (err, results) => {
        if (err) {
            console.error('Error fetching departments:', err);
            res.status(500).json({error: 'Internal Server Error'});
        } else {
            res.status(200).json(results);
        }
    });
});

app.get('/getFilteredData/:ID_D?/:ID_P?/:ANNEE?/:ID_R?', async (req, res) => {
    const {ID_D, ID_P, ANNEE, ID_R} = req.params;

    try {
        let query = `
            SELECT c.*, d.DEPARTEMENT, p.PRODUIT, m.MOIS, r.REGION
            FROM consommation c
            INNER JOIN departement d ON c.ID_D = d.ID_D
            INNER JOIN produit p ON c.ID_P = p.ID_P
            INNER JOIN p_mois m ON c.ID_M = m.ID_M
            INNER JOIN region r ON d.ID_R = r.ID_R
`;

        const conditions = [];
        const params = [];

        if (ID_D !== undefined && ID_D !== 'undefined' && ID_D !== "") {
            conditions.push(`c.ID_D = ?`);
            params.push(ID_D);
        }

        if (ID_P !== undefined && ID_P !== 'undefined' && ID_P !== "") {
            conditions.push(`c.ID_P = ?`);
            params.push(ID_P);
        }

        if (ANNEE !== undefined && ANNEE !== 'undefined' && ANNEE !== "") {
            conditions.push(`c.ANNEE = ?`);
            params.push(ANNEE);
        }

        if (ID_R !== undefined && ID_R !== 'undefined' && ID_R !== "") {
            conditions.push(`d.ID_R = ?`);
            params.push(ID_R);
        }

        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(' AND ')}`;
        }

        const [result] = await db.promise().query(query, params);

        res.json(result);
    } catch (error) {
        console.error('Error fetching filtered data:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/getAllConsommationData', async (req, res) => {

    try {
        const result = await db.promise().query('SELECT * FROM consommation');
        console.log(result[0])
        res.json(result[0]);
    } catch (error) {
        console.error('Error fetching all data from consommation:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.put('/users/:userId', async (req, res) => {
    const userId = req.params.userId;
    const updatedUserData = req.body;

    try {
        const updateQuery = 'UPDATE users SET email = ?, password = ?, delegate_par = ?, nom_prenom = ?, isAdmin = ?, active_statue = ?, tele = ?, ID_D = ? WHERE user_id = ?';
        const updateValues = [
            updatedUserData.email,
            updatedUserData.password,
            updatedUserData.delegate_par,
            updatedUserData.nom_prenom,
            updatedUserData.isAdmin,
            updatedUserData.active_statue,
            updatedUserData.tele, // Assuming 'tele' corresponds to 'G.S.M'
            updatedUserData.ID_D,
            userId
        ];

        await db.promise().query(updateQuery, updateValues);

        console.log('User updated successfully');
        // const updatedUser = await getUserById(userId); // You need to implement a function to get a user by ID
        // res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


app.delete('/users/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        await db.promise().query('DELETE FROM consommation WHERE user_id = ?', [userId]);

        const userDeletionResult = await db.promise().query('DELETE FROM users WHERE user_id = ?', [userId]);

        if (userDeletionResult.affectedRows === 0) {
            res.status(404).json({error: 'User not found'});
        } else {
            console.log('User and associated consommation records deleted successfully');
            res.status(200).json({message: 'User and associated consommation records deleted successfully'});
        }
    } catch (error) {
        console.error('Error deleting data from MySQL:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


app.get('/getuserConsomData/:ID_D', async (req, res) => {
    const userID_D = req.params.ID_D;
    const desiredProduit = req.query.produit;
    const desiredANNEE = req.query.annee;

    try {
        let departementInfoQuery = `
            SELECT consommation.MNT_CONS, pm.MOIS, p.ID_P, consommation.fin_periode, consommation.debut_periode, consommation.ANNEE, p.PRODUIT
            FROM consommation
            JOIN gestion_de_consom.p_mois pm ON pm.ID_M = consommation.ID_M
            JOIN gestion_de_consom.produit p ON p.ID_P = consommation.ID_P
            JOIN gestion_de_consom.annee annee ON annee.ANNEE = consommation.ANNEE
            WHERE consommation.ID_D = ${userID_D}`;

        if (desiredProduit) {
            departementInfoQuery += ` AND p.ID_P = ${desiredProduit}`;
        }

        if (desiredANNEE) {
            departementInfoQuery += ` AND consommation.ANNEE = ${desiredANNEE}`;
        }

        const [userInfo] = await db.promise().query(departementInfoQuery);

        console.log('User Info:', userInfo);

        if (userInfo.length === 0) {
            res.json([]);
        } else {
            res.json(userInfo);
        }
    } catch (error) {
        console.error('Error fetching user department and region:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});
app.get('/getuserConsoomData/:ID_D', async (req, res) => {
    const userID_D = req.params.ID_D;
    const desiredProduit = req.query.produit;
    const desiredANNEE = req.query.annee;

    try {
        let departementInfoQuery = `
            SELECT consommation.MNT_CONS, pm.MOIS, p.ID_P, consommation.fin_periode, consommation.debut_periode, consommation.ANNEE, p.PRODUIT
            FROM consommation
            JOIN gestion_de_consom.p_mois pm ON pm.ID_M = consommation.ID_M
            JOIN gestion_de_consom.produit p ON p.ID_P = consommation.ID_P
            JOIN gestion_de_consom.annee annee ON annee.ANNEE = consommation.ANNEE
            WHERE consommation.ID_D = ?`;

        const queryParams = [userID_D];

        if (desiredProduit) {
            departementInfoQuery += ' AND p.PRODUIT = ?';
            queryParams.push(desiredProduit);
        }

        if (desiredANNEE) {
            departementInfoQuery += ' AND consommation.ANNEE = ?';
            queryParams.push(desiredANNEE);
        }

        const [userInfo] = await db.promise().query(departementInfoQuery, queryParams);

        console.log('User Info:', userInfo);

        if (userInfo.length === 0) {
            res.json([]);
        } else {
            res.json(userInfo);
        }
    } catch (error) {
        console.error('Error fetching user department and region:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

app.get('/getadminConsoomData/:ID_D', async (req, res) => {
    const userID_D = req.params.ID_D;
    const desiredProduit = req.query.produit;
    const desiredANNEE = req.query.annee;

    try {
        let departementInfoQuery = `
            SELECT consommation.MNT_CONS, pm.MOIS, p.ID_P, consommation.fin_periode, consommation.debut_periode, consommation.ANNEE, p.PRODUIT
            FROM consommation
            JOIN gestion_de_consom.p_mois pm ON pm.ID_M = consommation.ID_M
            JOIN gestion_de_consom.produit p ON p.ID_P = consommation.ID_P
            JOIN gestion_de_consom.annee annee ON annee.ANNEE = consommation.ANNEE
            WHERE consommation.ID_D = ?`;

        const queryParams = [userID_D];

        if (desiredProduit) {
            departementInfoQuery += ' AND p.PRODUIT = ?';
            queryParams.push(desiredProduit);
        }

        if (desiredANNEE) {
            departementInfoQuery += ' AND consommation.ANNEE = ?';
            queryParams.push(desiredANNEE);
        }

        const [userInfo] = await db.promise().query(departementInfoQuery, queryParams);

        console.log('User Info:', userInfo);

        if (userInfo.length === 0) {
            res.json([]);
        } else {
            res.json(userInfo);
        }
    } catch (error) {
        console.error('Error fetching user department and region:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

app.get('/data', (req, res) => {
    const query = `
        SELECT
            dc.ID_DC AS donneconsom_id,
            dc.ANNEE,
            dc.ID_R AS region_id,
            r.REGION AS region_name,
            dc.ID_P AS produit_id,
            p.PRODUIT AS produit_name,
            dc.DEPAT_CREDIT,
            dc.DOTA_DEFINITIVE,
            dc.COMISSION,
            d.ID_D AS departement_id,
            d.DEPARTEMENT AS departement_name,
            c.ID_M AS mois_id,
            pm.MOIS AS mois_name,
            c.ID_O AS operateur_id,
            o.OPERATEUR AS operateur_name,
            c.MNT_CONS,
            c.DATEEFFET,
            c.OBSERVATION,
            c.DEBUT_PERIODE,
            c.FIN_PERIODE
        FROM
            donneconsom dc
        JOIN
            annee a ON dc.ANNEE = a.ANNEE
        JOIN
            region r ON dc.ID_R = r.ID_R
        JOIN
            produit p ON dc.ID_P = p.ID_P
        JOIN
            departement d ON dc.ID_R = d.ID_R
        JOIN
            consommation c ON dc.ID_R = c.ID_D AND dc.ID_P = c.ID_P AND dc.ANNEE = c.ANNEE
        JOIN
            p_mois pm ON c.ID_M = pm.ID_M
        JOIN
            operateur o ON c.ID_O = o.ID_O
    `;

    db.query(query, (err, results) => {
        if (err) {

            console.error('Error executing query:', err);
            res.status(500).json({error: 'Internal Server Error'});
        } else {
            console.log(results);
            res.json(results);
        }
    });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
